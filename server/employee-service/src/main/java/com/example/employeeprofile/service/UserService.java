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
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public UserDTO createUser(UserDTO userDTO) {
        User user = convertToEntity(userDTO);
        return convertToDTO(userRepository.save(user));
    }

    public UserDTO getUserByUsername(String username) {
        return userRepository.findById(username).map(this::convertToDTO).orElse(null);
    }

    public UserDTO updateUser(String username, UserDTO userDTO) {
        User existingUser = userRepository.findById(username).orElse(null);
        if (existingUser != null) {
            existingUser.setPassword(userDTO.getPassword());
            existingUser.setRole(userDTO.getRole());
            existingUser.setStatus(userDTO.getStatus());
            return convertToDTO(userRepository.save(existingUser));
        }
        return null;
    }

    public void deleteUser(String username) {
        userRepository.deleteById(username);
    }



    private User convertToEntity(UserDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setPassword(userDTO.getPassword());
        user.setRole(userDTO.getRole());
        user.setStatus(userDTO.getStatus());
        // Assuming you have a method to fetch Employee by ID
        Employee employee = employeeRepository.findById(userDTO.getEmployeeId()).orElse(null);
        user.setEmployee(employee);
        return user;
    }

    private UserDTO convertToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername(user.getUsername());
        userDTO.setPassword(user.getPassword());
        userDTO.setEmployeeId(user.getEmployee().getEmployeeId());
        userDTO.setRole(user.getRole());
        userDTO.setStatus(user.getStatus());
        return userDTO;
    }

}