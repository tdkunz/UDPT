package com.example.rewardpoint.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Data
@Document(collection = "points")
public class Point {
    @Id
    @MongoId(FieldType.OBJECT_ID)
    private String id;
    private Long uid;
    private Long bonusPoint;
    private Long totalPoint;
}