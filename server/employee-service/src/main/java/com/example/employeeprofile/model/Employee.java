package com.example.employeeprofile.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uId;

    @Column(unique = true)
    private String identifyId;

    private String name;
    private String gender;
    private String taxNumber;
    private String address = "";
    private String phoneNumber = "";
    private String bankNumber = "";
    private String position;
    private String department;
    private String status;

    @Column(unique = true)
    private String username;
}