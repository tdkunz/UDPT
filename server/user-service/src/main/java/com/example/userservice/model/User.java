package com.example.userservice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;

    private String password;
    private String role;
    private String status;

    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    private Employee employee;
}