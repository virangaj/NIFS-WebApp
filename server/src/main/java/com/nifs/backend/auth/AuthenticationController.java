package com.nifs.backend.auth;


import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.auth.ResetPasswordDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@CrossOrigin
public class AuthenticationController {


    @Autowired
    private AuthenticationService service;

    @GetMapping("/test")
    String test(@RequestBody String msg){
        return msg;
    }


    @PostMapping("/login")
    public ResponseEntity<?> loginRequest(@RequestBody LoginRequest request) {
        try {
            return ResponseEntity.ok(service.loginRequest(request));
        } catch (Exception e) {
            log.error("------------error : " + e.toString());
            return ResponseEntity.badRequest().body(AuthenticationResponse.builder()
                    .status(String.valueOf(RequestStatus.UNAUTHORIZED))
                    .code(200)
                    .message("Please check your credentials!")
                    .build());

        }
    }

    @PostMapping("/forget-password")
    public ResponseEntity<?> requestForgetPassword(@RequestBody String email){
        try{
            return service.forgetPassword(email);
        }catch (Exception e){
            return ResponseEntity.badRequest().body("Request cannot be done!");
        }
    }

    @PostMapping("/forget-password/{id}")
    public ResponseEntity<?> forgetPassword(@RequestBody String password, @PathVariable String id){
        try{
            return service.resetPassword(password, id);
        }catch (Exception e){
            return ResponseEntity.badRequest().body("Request cannot be done!");
        }
    }
}
