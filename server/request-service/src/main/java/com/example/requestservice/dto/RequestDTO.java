package com.example.requestservice.dto;

import lombok.Data;

@Data
public class RequestDTO {
    private String id;
    private String employeeId;
    private String reason;
    private String status;
    private String timeEnd;
    private String lyDoYeuCau;
    private String thietBi;
    private String trangThai;
}