package com.example.userservice.controller;

import com.example.userservice.dto.LoginRequest;
import com.example.userservice.dto.LoginResponse;
import com.example.userservice.dto.UserDTO;
import com.example.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login")
public class LoginController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping
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
}