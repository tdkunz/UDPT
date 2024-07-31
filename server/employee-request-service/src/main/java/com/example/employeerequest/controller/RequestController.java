package com.example.employeerequest.controller;

import com.example.employeerequest.model.Request;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/requests")
public class RequestController {

    private List<Request> requests = new ArrayList<>();

    @GetMapping
    public List<Request> getAllRequests() {
        return requests;
    }

    @PostMapping
    public Request createRequest(@RequestBody Request request) {
        requests.add(request);
        return request;
    }

    @GetMapping("/{id}")
    public Request getRequestById(@PathVariable Long id) {
        return requests.stream().filter(req -> req.getId().equals(id)).findFirst().orElse(null);
    }

    @PutMapping("/{id}")
    public Request updateRequest(@PathVariable Long id, @RequestBody Request request) {
        Request existingRequest = requests.stream().filter(req -> req.getId().equals(id)).findFirst().orElse(null);
        if (existingRequest != null) {
            existingRequest.setType(request.getType());
            existingRequest.setStatus(request.getStatus());
        }
        return existingRequest;
    }

    @DeleteMapping("/{id}")
    public void deleteRequest(@PathVariable Long id) {
        requests.removeIf(req -> req.getId().equals(id));
    }
}