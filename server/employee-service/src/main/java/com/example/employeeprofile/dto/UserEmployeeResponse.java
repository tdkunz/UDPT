package com.example.employeeprofile.dto;

public class UserEmployeeResponse {
    private UserDTO user;
    private EmployeeDTO employee;

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
}