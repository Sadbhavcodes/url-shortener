package com.sadbhav.urlshortener.dto;

import com.sadbhav.urlshortener.enums.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
    private String id;
    private String username;
    private String message;
    private Role role;
    private String token;
}
