package com.example.rewardpoint.model;


import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "points")
public class Point {
    private Long id;
    private Long employeeId;
    private Long bonusPoint;
    private Long totalPoint;
}