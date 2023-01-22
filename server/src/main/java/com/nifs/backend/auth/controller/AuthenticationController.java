package com.nifs.backend.auth.controller;


import com.nifs.backend.auth.service.IAuthenticationService;
import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.ChangePasswordDTO;
import com.nifs.backend.dto.LoginDetailsDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin
@RequiredArgsConstructor
public class AuthenticationController {

    @Autowired
    private IAuthenticationService authService;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDetailsDTO user){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try{
            //check user has changed default password
            if(authService.firstLogging(user)){
                System.out.println(user.toString());
                //return success response code
                map.put("status", RequestStatus.CHANGE_PASSWORD);
                map.put("code", 201);
                map.put("message", "Need to change Password");
            }
            else{

                //return error response code
                map.put("status", RequestStatus.ERROR);
                map.put("code", 404);
                map.put("message", "Please Enter valid Credentials!");
            }
            return new ResponseEntity<>(map, HttpStatus.OK);

        }catch (Exception e) {
            //return exception response code
            System.out.println(e.toString());
            map.put("status", RequestStatus.ERROR);
            map.put("code", 400);
            map.put("error", e.toString());
            map.put("message", "Internal server error. Please try again!");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }

    }



    @PatchMapping("/change-password/{epfNo}")
    private ResponseEntity<?> changePassword(@RequestBody ChangePasswordDTO data, @PathVariable int epfNo){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        System.out.println(data.toString());
        try{
            //check user has changed default password
            if(authService.changePassword(data, epfNo)){
                System.out.println(data.toString());
                //return success response code
                map.put("status", RequestStatus.SUCCESS);
                map.put("code", 201);
                map.put("message", "Password is successfully changed!");
                return new ResponseEntity<>(map, HttpStatus.OK);
            }

//            System.out.println(user.toString());
            //return error response code
            map.put("status", RequestStatus.ERROR);
            map.put("code", 404);
            map.put("message", "Request cannot be completed!");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }catch (Exception e) {
            //return exception response code
            System.out.println(e.toString());
            map.put("status", RequestStatus.ERROR);
            map.put("code", 400);
            map.put("error", e.toString());
            map.put("message", "Internal server error. Please try again!");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }
}
