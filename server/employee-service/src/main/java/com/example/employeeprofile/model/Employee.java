package com.example.employeeprofile.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@IdClass(EmployeeId.class)
public class Employee {
    @Id
    @Column(name = "employeeId")
    private Long employeeId;

    @Id
    @Column(name = "identifyId")
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