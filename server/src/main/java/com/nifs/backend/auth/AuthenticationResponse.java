package com.nifs.backend.auth;


import com.nifs.backend.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

    private String status;
    private int code;
    private String message;
    private String name;
    private String token;
    private UserDTO user;


}
