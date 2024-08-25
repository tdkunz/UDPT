package com.example.employeeprofile.dto;

import lombok.Data;

@Data
public class EmployeeDTO {
    private String identifyId;
    private String name;
    private String gender;
    private String taxNumber;
    private String address;
    private String phoneNumber;
    private String bankNumber;
    private String position;
    private String department;
    private String status;
}