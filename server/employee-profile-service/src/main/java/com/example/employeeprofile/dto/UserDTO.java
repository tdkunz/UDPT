package com.example.employeeprofile.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    private String username;
    private String password;
    private Long employeeId;
    private String role;
    private String status;

}