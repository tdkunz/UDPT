package com.example.rewardpoint.listener;

import com.example.rewardpoint.service.PointService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayInputStream;
import java.io.ObjectInputStream;

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
        } catch (Exception e) {
            logger.error("Error processing message", e);
        }
    }
}