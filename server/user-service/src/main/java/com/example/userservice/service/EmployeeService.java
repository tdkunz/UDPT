package com.example.userservice.service;

import com.example.userservice.dto.EmployeeDTO;
import com.example.userservice.model.Employee;
import com.example.userservice.model.User;
import com.example.userservice.repository.EmployeeRepository;
import com.example.userservice.repository.UserRepository;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


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

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public EmployeeDTO getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .map(employee -> {
                    EmployeeDTO employeeDTO = convertToDTO(employee);
                    String employeeName = employeeDTO.getName();
                    System.out.println("Sending message: " + employeeName);
                    rabbitTemplate.convertAndSend("employeeQueue", employeeName);
                    return employeeDTO;
                })
                .orElse(null);
    }

    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

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
            return convertToDTO(savedEmployee);
        }
    }



    public EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO) {
        Employee existingEmployee = employeeRepository.findById(id).orElse(null);
        if (existingEmployee != null) {
            existingEmployee.setIdentifyId(employeeDTO.getIdentifyId());
            existingEmployee.setName(employeeDTO.getName());
            existingEmployee.setGender(employeeDTO.getGender());
            existingEmployee.setTaxNumber(employeeDTO.getTaxNumber());
            existingEmployee.setAddress(employeeDTO.getAddress());
            existingEmployee.setPhoneNumber(employeeDTO.getPhoneNumber());
            existingEmployee.setBankNumber(employeeDTO.getBankNumber());
            existingEmployee.setPosition(employeeDTO.getPosition());
            existingEmployee.setDepartment(employeeDTO.getDepartment());
            existingEmployee.setStatus(employeeDTO.getStatus());
            return convertToDTO(employeeRepository.save(existingEmployee));
        }
        return null;
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    private EmployeeDTO convertToDTO(Employee employee) {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        employeeDTO.setIdentifyId(employee.getIdentifyId());
        employeeDTO.setName(employee.getName());
        employeeDTO.setGender(employee.getGender());
        employeeDTO.setTaxNumber(employee.getTaxNumber());
        employeeDTO.setAddress(employee.getAddress());
        employeeDTO.setPhoneNumber(employee.getPhoneNumber());
        employeeDTO.setBankNumber(employee.getBankNumber());
        employeeDTO.setPosition(employee.getPosition());
        employeeDTO.setDepartment(employee.getDepartment());
        employeeDTO.setStatus(employee.getStatus());
        return employeeDTO;
    }

    private Employee convertToEntity(EmployeeDTO employeeDTO) {
        Employee employee = new Employee();
        employee.setIdentifyId(employeeDTO.getIdentifyId());
        employee.setName(employeeDTO.getName());
        employee.setGender(employeeDTO.getGender());
        employee.setTaxNumber(employeeDTO.getTaxNumber());
        employee.setAddress(employeeDTO.getAddress());
        employee.setPhoneNumber(employeeDTO.getPhoneNumber());
        employee.setBankNumber(employeeDTO.getBankNumber());
        employee.setPosition(employeeDTO.getPosition());
        employee.setDepartment(employeeDTO.getDepartment());
        employee.setStatus(employeeDTO.getStatus());
        return employee;
    }
}