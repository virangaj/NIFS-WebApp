package com.nifs.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/login")
@CrossOrigin
public class UserController {

    @GetMapping("/test")
    private String test(){
        return "Hello!";
    }

    @GetMapping("/user")
    private Principal user(Principal principal){
        System.out.println("Username : " + principal.getName());
        return principal;
    }
}
