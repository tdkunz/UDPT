package com.example.requestservice.repository;


import com.example.requestservice.model.NhanVien;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NhanVienRepository extends MongoRepository<NhanVien, String> {
    // Custom queries if needed
}