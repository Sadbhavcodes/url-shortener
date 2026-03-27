package com.sadbhav.urlshortener.dto;

import com.sadbhav.urlshortener.enums.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
public class UserResponse {
    @Setter
    private long id;

    @Setter
    private String username;

    @Setter
    private Role role;

    @Setter
    private String message;

    @Setter
    private String token;
}
