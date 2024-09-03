package com.example.requestservice.service;

import com.example.requestservice.model.Request;
import com.example.requestservice.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestService {

    @Autowired
    private RequestRepository requestRepository;

    public List<Request> getAllRequests() {
        return requestRepository.findAll();
    }

    public Request getRequestById(String id) {
        return requestRepository.findById(id).orElse(null);
    }

    public Request createRequest(Request request) {
        return requestRepository.save(request);
    }

    public Request updateRequest(Request request) {
        return requestRepository.save(request);
    }

    public void deleteRequest(String id) {
        requestRepository.deleteById(id);
    }

    public Request approveRequest(String id, String nhanVienPheDuyet) {
        Request request = requestRepository.findById(id).orElse(null);
        if (request != null) {
            request.setStatus("Approved");
            request.setEmployeeId(nhanVienPheDuyet);
            return requestRepository.save(request);
        }
        return null;
    }

    public Request rejectRequest(String id, String lyDoTuChoi) {
        Request yeuCau = requestRepository.findById(id).orElse(null);
        if (yeuCau != null) {
            yeuCau.setStatus("Rejected");
            yeuCau.setReasonReject(lyDoTuChoi);
            return requestRepository.save(yeuCau);
        }
        return null;
    }
    public List<Request> getRequestsByStatus(String status) {
        return requestRepository.findByStatus(status);
    }

    public List<Request> getRequestsByStatusNot(String status) {
        return requestRepository.findByStatusNot(status);
    }
}
