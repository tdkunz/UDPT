package com.example.employeeprofile.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uId;

    @Column(unique = true)
    private String username;

    private String password;
    private String role;
    private String status;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "uId", referencedColumnName = "uId")
    private Employee employee;
}