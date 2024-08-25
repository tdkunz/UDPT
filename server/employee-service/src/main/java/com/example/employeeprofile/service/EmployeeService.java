package com.example.employeeprofile.service;

import com.example.employeeprofile.dto.EmployeeDTO;
import com.example.employeeprofile.model.Employee;
import com.example.employeeprofile.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public boolean identifyIdExists(String identifyId) {
        return employeeRepository.existsByIdentifyId(identifyId);
    }

    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public EmployeeDTO createEmployee(EmployeeDTO employeeDTO) {
        if (employeeDTO == null) {
            throw new IllegalArgumentException("EmployeeDTO cannot be null");
        }

        boolean identifyIdExists = employeeRepository.existsByIdentifyId(employeeDTO.getIdentifyId());

        if (identifyIdExists) {
            throw new IllegalArgumentException("Identify ID already exists");
        } else {
            Employee employee = convertToEntity(employeeDTO);
            return convertToDTO(employeeRepository.save(employee));
        }
    }

    public EmployeeDTO getEmployeeById(Long id) {
        return employeeRepository.findById(id).map(this::convertToDTO).orElse(null);
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