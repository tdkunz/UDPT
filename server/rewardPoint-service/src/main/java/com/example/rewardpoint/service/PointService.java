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

    @Scheduled(cron = "0 0 0 1 * ?") // Runs every 30 seconds
    public void addMonthlyPoints() {
        logger.info("Running scheduled task: addMonthlyPoints");
        List<Point> allPoints = pointRepository.findAll();
        for (Point point : allPoints) {
            point.setTotalPoint(point.getTotalPoint() + 10);
            pointRepository.save(point);
            logger.info("Updated totalPoint for uid {}: {}", point.getUid(), point.getTotalPoint());
        }
    }


    @Transactional
    public Point sendPoint(Long managerId, Long giverUid, Long receiverUid, Long points, String message) {
        Optional<Point> giverOptional = pointRepository.findByUid(giverUid);
        Optional<Point> receiverOptional = pointRepository.findByUid(receiverUid);

        if (giverOptional.isPresent() && receiverOptional.isPresent()) {
            Point giver = giverOptional.get();
            Point receiver = receiverOptional.get();

            if (giver.getTotalPoint() < points) {
                throw new IllegalArgumentException("Insufficient points to send");
            }

            // Deduct points from giver
            giver.setBonusPoint(giver.getBonusPoint() - points);
            giver.setTotalPoint(giver.getTotalPoint() - points);

            // Add points to receiver
            receiver.setBonusPoint(receiver.getBonusPoint() + points);
            receiver.setTotalPoint(receiver.getTotalPoint() + points);

            // Create history point for receiver
            HistoryPoint historyPointReceiver = new HistoryPoint();
            historyPointReceiver.setId(new ObjectId());
            historyPointReceiver.setManagerId(managerId);
            historyPointReceiver.setPointsSent(points);
            historyPointReceiver.setDateSent(new Date());
            historyPointReceiver.setMessage(message);
            receiver.getHistoryPoints().add(historyPointReceiver);

            // Create history point for giver
            HistoryPoint historyPointGiver = new HistoryPoint();
            historyPointGiver.setId(new ObjectId());
            historyPointGiver.setManagerId(managerId);
            historyPointGiver.setPointsSent(-points);
            historyPointGiver.setDateSent(new Date());
            historyPointGiver.setMessage("Sent points to UID: " + receiverUid);
            giver.getHistoryPoints().add(historyPointGiver);

            pointRepository.save(giver);
            return pointRepository.save(receiver);
        }
        return null;
    }

}