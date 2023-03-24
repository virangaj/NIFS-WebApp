package com.nifs.backend.dto.admin;

import lombok.Data;

@Data
public class ChangePasswordDTO {

    private int epfNo;
    private String oldPassword;
    private String newPassword;
    private String confirmPassword;


}
