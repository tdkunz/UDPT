package com.example.requestservice.repository;

import com.example.requestservice.model.Request;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestRepository extends MongoRepository<Request, String> {
    List<Request> findByStatus(String status);

    List<Request> findByStatusNot(String status);

    List<Request> findByRequestType(String requestType);
}