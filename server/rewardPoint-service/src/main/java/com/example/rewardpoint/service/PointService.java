// File: server/rewardPoint-service/src/main/java/com/example/rewardpoint/service/PointService.java
package com.example.rewardpoint.service;

import com.example.rewardpoint.model.HistoryPoint;
import com.example.rewardpoint.model.Point;
import com.example.rewardpoint.repository.PointRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PointService {

    private static final Logger logger = LoggerFactory.getLogger(PointService.class);

    @Autowired
    private PointRepository pointRepository;

    public void createPointRecord(Long uid) {
        Point point = new Point();
        point.setUid(uid);
        point.setBonusPoint(0L);
        point.setTotalPoint(0L);
        pointRepository.save(point);
    }

    public Point savePoint(Point point) {
        return pointRepository.save(point);
    }

    public List<Point> getListPointRecord() {
        return pointRepository.findAll();
    }

    public Optional<Point> getDetailPointRecord(Long uid) {
        return pointRepository.findByUid(uid);
    }

    @Scheduled(cron = "0 0 0 1 * ?") // Run at midnight on the first day of every month
    public void addMonthlyPoints() {
        logger.info("Running scheduled task: addMonthlyPoints");
        List<Point> allPoints = pointRepository.findAll();
        for (Point point : allPoints) {
            point.setTotalPoint(point.getTotalPoint() + 10);
            pointRepository.save(point);
            logger.info("Updated totalPoint for uid {}: {}", point.getUid(), point.getTotalPoint());
        }
    }
/**/

    @Transactional
    public Point sendPoint(Long managerId, Long employeeId, Long points, String message) {
        Optional<Point> managerOptional = pointRepository.findByUid(managerId);
        Optional<Point> employeeOptional = pointRepository.findByUid(employeeId);

        if (managerOptional.isPresent() && employeeOptional.isPresent()) {
            Point manager = managerOptional.get();
            Point employee = employeeOptional.get();

            if (manager.getTotalPoint() < points) {
                throw new IllegalArgumentException("Số dư điểm không đủ để thực hiện. Vui lòng thử lại!");
            }

            // Deduct points from manager
            manager.setBonusPoint(manager.getBonusPoint() - points);
            manager.setTotalPoint(manager.getTotalPoint() - points);

            // Add points to employee
            employee.setBonusPoint(employee.getBonusPoint() + points);
            employee.setTotalPoint(employee.getTotalPoint() + points);

            // Create history point for employee
            HistoryPoint historyPointEmployee = new HistoryPoint();
            historyPointEmployee.setId(new ObjectId());
            historyPointEmployee.setManagerId(managerId);
            historyPointEmployee.setPointsSent(points);
            historyPointEmployee.setDateSent(new Date());
            historyPointEmployee.setMessage(message);
            employee.getHistoryPoints().add(historyPointEmployee);

            // Create history point for manager
            HistoryPoint historyPointManager = new HistoryPoint();
            historyPointManager.setId(new ObjectId());
            historyPointManager.setManagerId(managerId);
            historyPointManager.setPointsSent(-points);
            historyPointManager.setDateSent(new Date());
            historyPointManager.setMessage("Sent points to UID: " + employeeId);
            manager.getHistoryPoints().add(historyPointManager);

            pointRepository.save(manager);
            return pointRepository.save(employee);
        }
        return null;
    }

}