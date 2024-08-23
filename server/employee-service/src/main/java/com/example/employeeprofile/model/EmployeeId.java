package com.example.employeeprofile.model;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;


@Getter
@Setter
public class EmployeeId implements Serializable {
    private Long employeeId;
    private String identifyId;

    public EmployeeId() {}

    public EmployeeId(Long employeeId, String identifyId) {
        this.employeeId = employeeId;
        this.identifyId = identifyId;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getIdentifyId() {
        return identifyId;
    }

    public void setIdentifyId(String identifyId) {
        this.identifyId = identifyId;
    }

    // hashCode and equals methods
    @Override
    public int hashCode() {
        return Objects.hash(employeeId, identifyId);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        EmployeeId that = (EmployeeId) obj;
        return Objects.equals(employeeId, that.employeeId) &&
                Objects.equals(identifyId, that.identifyId);
    }
}