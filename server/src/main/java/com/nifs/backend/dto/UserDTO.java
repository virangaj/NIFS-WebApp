package com.nifs.backend.dto;



import com.nifs.backend.constant.UserRole;
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
    private UserRole role;
    private Date lastLogin;
    private String division;
}
