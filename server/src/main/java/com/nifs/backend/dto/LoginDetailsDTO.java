package com.nifs.backend.dto;



import lombok.Data;

import java.util.Date;

@Data
public class LoginDetailsDTO {
    private Integer id;
    private int epfNo;
    private String email;
    private String password;
    private Date lsatLogin;
}
