package com.nifs.backend.auth;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthenticationController {


    @Autowired
    private AuthenticationService service;

    @PostMapping("/login")
    public ResponseEntity<?> loginRequest(@RequestBody LoginRequest request) {
        try {
            return ResponseEntity.ok(service.loginRequest(request));
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.ok("Bad Request");

        }
    }
}
