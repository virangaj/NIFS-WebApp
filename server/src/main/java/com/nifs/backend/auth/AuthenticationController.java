package com.nifs.backend.auth;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@CrossOrigin
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
