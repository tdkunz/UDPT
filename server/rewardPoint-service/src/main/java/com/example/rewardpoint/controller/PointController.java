package com.example.rewardpoint.controller;

import com.example.rewardpoint.model.Point;
import com.example.rewardpoint.service.PointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rewards")
public class PointController {

    @Autowired
    private PointService pointService;

    @PostMapping
    public Point createPoint(@RequestBody Point point) {
        return pointService.savePoint(point);
    }
}