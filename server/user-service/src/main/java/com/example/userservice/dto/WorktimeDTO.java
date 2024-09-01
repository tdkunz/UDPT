package com.example.userservice.dto;

import lombok.Data;

@Data
public class WorktimeDTO {
    private Long id;
    private Long uid;
    private String timeStart;
    private String timeEnd;
    private String day;
}