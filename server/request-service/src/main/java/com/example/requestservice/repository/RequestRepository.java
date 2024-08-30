package com.example.requestservice.repository;


import com.example.requestservice.model.Request;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestRepository extends MongoRepository<Request, String> {
    // Custom queries if needed
}