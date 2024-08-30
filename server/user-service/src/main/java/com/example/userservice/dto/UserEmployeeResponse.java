package com.example.userservice.dto;

public class UserEmployeeResponse {
    private UserDTO user;
    private EmployeeDTO employee;
    private String message;

    // Constructors, Getters, and Setters

    public UserEmployeeResponse() {}

    public UserEmployeeResponse(UserDTO user, EmployeeDTO employee) {
        this.user = user;
        this.employee = employee;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public EmployeeDTO getEmployee() {
        return employee;
    }

    public void setEmployee(EmployeeDTO employee) {
        this.employee = employee;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}