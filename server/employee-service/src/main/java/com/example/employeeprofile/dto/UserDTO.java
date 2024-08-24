package com.example.employeeprofile.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class UserDTO {
    private String username;
    private String password;
    private String role;
    private String status;


    public String getName() {
        return "";
    }

    public String getIdentifyId() {
        return "";
    }
}