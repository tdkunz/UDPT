package com.example.userservice.repository;

import com.example.userservice.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    boolean existsByIdentifyId(String identifyId);
    Optional<Employee> findById(Long id);
}