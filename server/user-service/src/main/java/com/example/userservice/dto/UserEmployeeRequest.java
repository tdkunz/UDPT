package com.example.userservice.dto;

public class UserEmployeeRequest {
    private UserDTO user;
    private EmployeeDTO employee;

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
}