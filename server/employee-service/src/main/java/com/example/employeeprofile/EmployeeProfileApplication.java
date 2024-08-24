package com.example.employeeprofile;

import com.example.employeeprofile.model.Employee;
import com.example.employeeprofile.repository.EmployeeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EmployeeProfileApplication  {
//    private final EmployeeRepository employeeRepository;
//    public EmployeeProfileApplication(EmployeeRepository employeeRepository) {
//        this.employeeRepository = employeeRepository;
//    }

    public static void main(String[] args) {
        SpringApplication.run(EmployeeProfileApplication.class, args);
    }
//    @Override
//    public void run(String... args) throws Exception {
//        employeeRepository.save(new Employee(1, "ID12345", "John Doe", "Male", "TX123456", "123 Main St", "555-1234", "BN123456", "Developer", "IT", "Active"));
//    }
}