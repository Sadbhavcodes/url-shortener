package com.sadbhav.urlshortener.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.jspecify.annotations.Nullable;

@Getter
@Setter
public class UserRequest {

    @NotBlank(message = "Username can not be blank")
    private String username;

    private String password;
}
