package com.example.requestservice.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "request")
public class Request {
    @Id
    private String id;
    private String employeeId; // ID of the employee requesting
    private String employeeName;
    private String managerId; // ID of the approving manager
    private String requestType; // Request type
    private String day;
    private String timeStart;
    private String timeEnd;
    private String reasonRequest;
    private String device;
    private String status;
    private String reasonReject;
}
