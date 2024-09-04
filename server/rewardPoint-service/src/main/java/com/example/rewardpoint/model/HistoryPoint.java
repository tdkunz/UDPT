package com.example.rewardpoint.model;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "historyPoints")
public class HistoryPoint {
    @Id
    private ObjectId id;
    private Long managerId;
    private Long pointsSent;
    private Date dateSent;
    private String message;
}