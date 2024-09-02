// File: server/rewardPoint-service/src/main/java/com/example/rewardpoint/service/PointService.java
package com.example.rewardpoint.service;

import com.example.rewardpoint.model.Point;
import com.example.rewardpoint.repository.PointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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
}