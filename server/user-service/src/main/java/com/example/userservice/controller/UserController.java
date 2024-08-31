package com.example.userservice.controller;

import com.example.userservice.dto.*;
import com.example.userservice.service.UserService;
import com.example.userservice.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        UserDTO userDTO = userService.getUserByUsername(loginRequest.getUsername());
        if (userDTO != null && passwordEncoder.matches(loginRequest.getPassword(), userDTO.getPassword())) {
            String token = "dummy-token";
            LoginResponse response = new LoginResponse("Login successful", token, userDTO.getRole(), userDTO.getId());
            return ResponseEntity.ok(response);
        } else {
            LoginResponse response = new LoginResponse("Invalid username or password", null, null, null);
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping
    public ResponseEntity<UserEmployeeResponse> createUser(@RequestBody UserEmployeeRequest request) {
        // Kiểm tra xem username hoặc identifyId đã tồn tại hay chưa
        boolean usernameExists = userService.usernameExists(request.getUser().getUsername());
        boolean identifyIdExists = employeeService.identifyIdExists(request.getEmployee().getIdentifyId());

        if (usernameExists || identifyIdExists) {
            UserEmployeeResponse errorResponse = new UserEmployeeResponse();
            errorResponse.setMessage("Username or Identify ID already exists");
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        // Tạo User trước và lấy ID của nó
        UserDTO createdUser = userService.createUser(request.getUser());

        // Sử dụng ID của User để tạo Employee
        EmployeeDTO createdEmployee = employeeService.createEmployee(request.getEmployee(), createdUser.getId());

        // Trả về phản hồi kết hợp
        UserEmployeeResponse response = new UserEmployeeResponse(createdUser, createdEmployee);
        return ResponseEntity.ok(response);
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