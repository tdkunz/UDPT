package com.example.employeeprofile.repository;

import com.example.employeeprofile.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}