package com.example.employeeprofile.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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

    public String setUsername(String  username) {
        return username;
    }
}