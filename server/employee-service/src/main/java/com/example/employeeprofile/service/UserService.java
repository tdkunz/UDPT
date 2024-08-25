package com.example.employeeprofile.service;

import com.example.employeeprofile.dto.UserDTO;
import com.example.employeeprofile.model.Employee;
import com.example.employeeprofile.model.User;
import com.example.employeeprofile.repository.UserRepository;
import com.example.employeeprofile.repository.EmployeeRepository;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public boolean usernameExists(String username) {
        return userRepository.findByUsername(username).isPresent();
    }
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public UserDTO createUser(UserDTO userDTO) {
        if (userDTO == null) {
            throw new IllegalArgumentException("UserDTO cannot be null");
        }

        String generatedPassword = RandomStringUtils.random(8, true, true);
        System.out.println("Generated password: " + generatedPassword);

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(generatedPassword);
        userDTO.setPassword(hashedPassword);

        boolean usernameExists = userRepository.findByUsername(userDTO.getUsername()).isPresent();
        boolean identifyIdExists = employeeRepository.existsByIdentifyId(userDTO.getUsername());

        if (usernameExists || identifyIdExists) {
            throw new IllegalArgumentException("Username or Identify ID already exists");
        } else {
            User user = convertToEntity(userDTO);
            return convertToDTO(userRepository.save(user));
        }
    }

    public UserDTO getUserByUsername(String username) {
        return userRepository.findById(Long.valueOf(username)).map(this::convertToDTO).orElse(null);
    }

    public UserDTO updateUser(String username, UserDTO userDTO) {
        User existingUser = userRepository.findById(Long.valueOf(username)).orElse(null);
        if (existingUser != null) {
            existingUser.setPassword(userDTO.getPassword());
            existingUser.setRole(userDTO.getRole());
            existingUser.setStatus(userDTO.getStatus());
            return convertToDTO(userRepository.save(existingUser));
        }
        return null;
    }

    public void deleteUser(String username) {
        userRepository.deleteById(Long.valueOf(username));
    }

    private User convertToEntity(UserDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setPassword(userDTO.getPassword());
        user.setRole(userDTO.getRole());
        user.setStatus(userDTO.getStatus());
        return user;
    }

    private UserDTO convertToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername(user.getUsername());
        userDTO.setPassword(user.getPassword());
        userDTO.setRole(user.getRole());
        userDTO.setStatus(user.getStatus());
        return userDTO;
    }
}