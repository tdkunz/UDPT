package com.example.userservice.service;

import com.example.userservice.dto.EmployeeDTO;
import com.example.userservice.model.Employee;
import com.example.userservice.model.User;
import com.example.userservice.repository.EmployeeRepository;
import com.example.userservice.repository.UserRepository;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private UserRepository userRepository;

    //Cac ham cai them
    public boolean identifyIdExists(String identifyId) {
        return employeeRepository.existsByIdentifyId(identifyId);
    }

    public String getEmployeeNameById(Long id) {
        EmployeeDTO employee = getEmployeeById(id);
        return employee != null ? employee.getName() : null;
    }


    public EmployeeDTO getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .map(employee -> {
                    EmployeeDTO employeeDTO = convertToDTO(employee);
                    return employeeDTO;
                })
                .orElse(null);
    }

    public String uploadAvatar(MultipartFile file) throws IOException {
        byte[] bytes = file.getBytes();
        return Base64.getEncoder().encodeToString(bytes);
    }

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public EmployeeDTO createEmployee(EmployeeDTO employeeDTO, Long userId) {
        if (employeeDTO == null) {
            throw new IllegalArgumentException("EmployeeDTO cannot be null");
        }

        boolean identifyIdExists = employeeRepository.existsByIdentifyId(employeeDTO.getIdentifyId());

        if (identifyIdExists) {
            throw new IllegalArgumentException("Identify ID already exists");
        } else {
            Employee employee = convertToEntity(employeeDTO);

            // Tìm User theo userId và thiết lập cho Employee
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));
            employee.setUser(user); // Liên kết Employee với User đã tạo

            Employee savedEmployee = employeeRepository.save(employee);

            Long id = savedEmployee.getUser().getId();
            System.out.println("Sending message: " + id);

            // Serialize the Long id to a byte array
            try (ByteArrayOutputStream bos = new ByteArrayOutputStream();
                 ObjectOutputStream oos = new ObjectOutputStream(bos)) {
                oos.writeObject(id);
                oos.flush();
                byte[] idMessage = bos.toByteArray();
                rabbitTemplate.convertAndSend("employeeQueue", idMessage);
            } catch (IOException e) {
                throw new RuntimeException("Failed to serialize id", e);
            }

            return convertToDTO(savedEmployee);
        }
    }

    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new RuntimeException("Employee not found"));
        employee.setName(employeeDTO.getName());
        employee.setBirthDate(employeeDTO.getBirthDate());
        employee.setAvatar(employeeDTO.getAvatar());
        employee.setGender(employeeDTO.getGender());
        employee.setTaxNumber(employeeDTO.getTaxNumber());
        employee.setAddress(employeeDTO.getAddress());
        employee.setPhoneNumber(employeeDTO.getPhoneNumber());
        employee.setBankNumber(employeeDTO.getBankNumber());
        employee.setPosition(employeeDTO.getPosition());
        employee.setDepartment(employeeDTO.getDepartment());
        employee.setStatus(employeeDTO.getStatus());
        return convertToDTO(employeeRepository.save(employee));
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    private EmployeeDTO convertToDTO(Employee employee) {
        EmployeeDTO dto = new EmployeeDTO();
        dto.setId(employee.getId());
        dto.setIdentifyId(employee.getIdentifyId());
        dto.setName(employee.getName());
        dto.setBirthDate(employee.getBirthDate());
        dto.setAvatar(employee.getAvatar());
        dto.setGender(employee.getGender());
        dto.setTaxNumber(employee.getTaxNumber());
        dto.setAddress(employee.getAddress());
        dto.setPhoneNumber(employee.getPhoneNumber());
        dto.setBankNumber(employee.getBankNumber());
        dto.setPosition(employee.getPosition());
        dto.setDepartment(employee.getDepartment());
        dto.setStatus(employee.getStatus());
        return dto;
    }

    private Employee convertToEntity(EmployeeDTO dto) {
        Employee employee = new Employee();
        employee.setIdentifyId(dto.getIdentifyId());
        employee.setName(dto.getName());
        employee.setBirthDate(dto.getBirthDate());
        employee.setAvatar(dto.getAvatar());
        employee.setGender(dto.getGender());
        employee.setTaxNumber(dto.getTaxNumber());
        employee.setAddress(dto.getAddress());
        employee.setPhoneNumber(dto.getPhoneNumber());
        employee.setBankNumber(dto.getBankNumber());
        employee.setPosition(dto.getPosition());
        employee.setDepartment(dto.getDepartment());
        employee.setStatus(dto.getStatus());
        return employee;
    }
}