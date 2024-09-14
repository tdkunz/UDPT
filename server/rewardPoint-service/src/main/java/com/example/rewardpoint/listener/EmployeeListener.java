package com.example.rewardpoint.listener;

import com.example.rewardpoint.service.PointService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.client.RestTemplate;

import java.io.ByteArrayInputStream;
import java.io.ObjectInputStream;
import java.util.HashMap;
import java.util.Map;

@Component
public class EmployeeListener {

    private static final Logger logger = LoggerFactory.getLogger(EmployeeListener.class);

    @Autowired
    private PointService pointService;

    @RabbitListener(queues = "employeeQueue")
    public void handleEmployeeMessage(byte[] uidMessage) {
        try (ByteArrayInputStream bis = new ByteArrayInputStream(uidMessage);
             ObjectInputStream ois = new ObjectInputStream(bis)) {
            Long uid = (Long) ois.readObject();
            System.out.println("Received message: " + uid);
            pointService.createPointRecord(uid);
            createVoucherProfile(uid);
        } catch (Exception e) {
            logger.error("Error processing message", e);
        }
    }

    public void createVoucherProfile(Long uid) {
        String apiUrl = "https://university-of-science.sandbox.vouchery.app/api/v2.1/customers";
        String apiKey = "44ea1ba880c3d4df6a9954bfb44644177b6efdc2b605151d5ca64696f7d365c2";

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> bodyParams = new HashMap<>();
        bodyParams.put("identifier", uid.toString()); // Convert uid to String

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(bodyParams, headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity, String.class);
            if (response.getStatusCode().is2xxSuccessful()) {
                logger.info("Successfully created voucher profile for UID: " + uid);
            } else {
                logger.error("Failed to create voucher profile for UID: " + uid + ". Status code: " + response.getStatusCode());
            }
        } catch (Exception e) {
            logger.error("Error creating voucher profile for UID: " + uid, e);
        }
    }
}