package com.nifs.backend.auth.service;

import com.nifs.backend.dto.ChangePasswordDTO;
import com.nifs.backend.dto.LoginDetailsDTO;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;

@Service
public interface IAuthenticationService {
    boolean firstLogging(LoginDetailsDTO user) throws NoSuchAlgorithmException;

    boolean changePassword(ChangePasswordDTO data, int epfNo) throws NoSuchAlgorithmException;
}
