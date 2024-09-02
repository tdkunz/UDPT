package com.example.rewardpoint;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class RewardPointApplication {

    public static void main(String[] args) {
        SpringApplication.run(RewardPointApplication.class, args);
    }
}