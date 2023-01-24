package com.nifs.backend.dto;



import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class UserDTO {
    private Integer id;
    private int epfNo;
    private String email;
    private String password;
    private Date lastLogin;
}
