package com.NIFS.server.controller;

import java.security.NoSuchAlgorithmException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@CrossOrigin
public class Controller {

    @GetMapping("/getuser")
    public String getUser() throws NoSuchAlgorithmException {
        return "Hello";
    }
}
