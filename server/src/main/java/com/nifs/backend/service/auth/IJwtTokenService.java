package com.nifs.backend.service.auth;

import org.springframework.stereotype.Service;

@Service
public interface IJwtTokenService {
    String createToken(String jwtToken, int epfNo);

    String getToken(String databaseToken);
}
