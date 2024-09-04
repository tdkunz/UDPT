package com.example.rewardpoint.controller;

import com.example.rewardpoint.model.Point;
import com.example.rewardpoint.service.PointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/points")
public class PointController {

    @Autowired
    private PointService pointService;

    @PostMapping
    public Point createPoint(@RequestBody Point point) {
        return pointService.savePoint(point);
    }

    @GetMapping
    public List<Point> getListPointRecord() {
        return pointService.getListPointRecord();
    }

    @GetMapping("/{uid}")
    public Optional<Point> getDetailPointRecord(@PathVariable Long uid) {
        return pointService.getDetailPointRecord(uid);
    }


    @PostMapping("/send")
    public Point sendPoint(@RequestParam Long managerId, @RequestParam Long giverUid, @RequestParam Long receiverUid, @RequestParam Long points, @RequestParam String message) {
        return pointService.sendPoint(managerId, giverUid, receiverUid, points, message);
    }
}