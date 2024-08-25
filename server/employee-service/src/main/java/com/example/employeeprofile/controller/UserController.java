package com.example.employeeprofile.controller;

import com.example.employeeprofile.dto.UserDTO;
import com.example.employeeprofile.dto.EmployeeDTO;
import com.example.employeeprofile.dto.UserEmployeeRequest;
import com.example.employeeprofile.dto.UserEmployeeResponse;
import com.example.employeeprofile.service.UserService;
import com.example.employeeprofile.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody UserEmployeeRequest request) {
        // Check if username or identifyId exists
        boolean usernameExists = userService.usernameExists(request.getUser().getUsername());
        boolean identifyIdExists = employeeService.identifyIdExists(request.getEmployee().getIdentifyId());

        if (usernameExists || identifyIdExists) {
            return ResponseEntity.badRequest().body("Username or Identify ID already exists");
        }

        // Create User
        UserDTO createdUser = userService.createUser(request.getUser());

        // Create Employee
        EmployeeDTO createdEmployee = employeeService.createEmployee(request.getEmployee());

        // Return combined response
        UserEmployeeResponse response = new UserEmployeeResponse(createdUser, createdEmployee);
        return ResponseEntity.ok(response.toString());
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserDTO> getUserByUsername(@PathVariable String username) {
        UserDTO userDTO = userService.getUserByUsername(username);
        if (userDTO != null) {
            return ResponseEntity.ok(userDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{username}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable String username, @RequestBody UserDTO userDTO) {
        UserDTO updatedUser = userService.updateUser(username, userDTO);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<Void> deleteUser(@PathVariable String username) {
        userService.deleteUser(username);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
}