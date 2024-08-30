package com.example.rewardpoint.service;

import com.example.rewardpoint.model.Point;
import com.example.rewardpoint.repository.PointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PointService {

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
}