package com.nifs.backend.auth;

import com.nifs.backend.config.JwtService;
import com.nifs.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private JwtService jwtService;

    private final AuthenticationManager manager;

    public AuthenticationResponse loginRequest(LoginRequest request) {
        manager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEpfNo(),
                        request.getPassword()
                ));

        var user = repository.returnLoginDetails(request.getEpfNo());
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
