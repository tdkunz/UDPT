package com.example.rewardpoint.model;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "points")
public class Point {
    @Id
    private ObjectId id;
    private Long uid;
    private Long bonusPoint;
    private Long totalPoint;
    private List<HistoryPoint> historyPoints = new ArrayList<>();
}