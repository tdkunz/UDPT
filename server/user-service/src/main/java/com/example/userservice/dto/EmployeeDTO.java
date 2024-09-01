package com.example.userservice.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeDTO {
    private Long id;
    private String identifyId;
    private String name;
    private String birthDate;
    private String avatar; // Base64 encoded string
    private String gender;
    private String taxNumber;
    private String address;
    private String phoneNumber;
    private String bankNumber;
    private String position;
    private String department;
    private String status;
}