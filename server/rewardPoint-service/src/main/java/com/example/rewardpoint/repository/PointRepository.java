package com.example.rewardpoint.repository;

import com.example.rewardpoint.model.Point;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PointRepository extends MongoRepository<Point, Long> {
}