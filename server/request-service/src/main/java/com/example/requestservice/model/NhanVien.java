package com.example.requestservice.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "employee")
public class NhanVien {
    @Id
    private String id;
    private String name;
    private String position;
    private String department;
    private String quanLy; // Manager ID
}

