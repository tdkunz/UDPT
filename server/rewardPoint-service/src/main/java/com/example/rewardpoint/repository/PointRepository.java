package com.example.rewardpoint.repository;

import com.example.rewardpoint.model.Point;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface PointRepository extends MongoRepository<Point, String> {
    Optional<Point> findByUid(Long uid);
}