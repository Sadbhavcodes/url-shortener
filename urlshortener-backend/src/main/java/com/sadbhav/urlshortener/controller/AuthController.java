package com.sadbhav.urlshortener.controller;

import com.sadbhav.urlshortener.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sadbhav.urlshortener.dto.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody UserRequest userRequest){
        UserResponse response = userService.registerUser(userRequest);
        return new ResponseEntity<>(response,HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request){
        LoginResponse response = userService.loginUser(request);
        return new ResponseEntity<>(response,HttpStatus.ACCEPTED);
    }

    @PutMapping("/upgrade/{username}")
    public ResponseEntity<UserResponse> upgrade(@PathVariable String username){
        UserResponse response = userService.upgradeToPremium(username);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
