package com.sadbhav.urlshortener.service;

import com.sadbhav.urlshortener.dto.*;
import com.sadbhav.urlshortener.model.User;

import java.util.Optional;

public interface UserService {

    UserResponse registerUser(UserRequest userRequest);
    Optional<User> findByUsername(String username);
    UserResponse upgradeToPremium(String username);
    LoginResponse loginUser(LoginRequest loginRequest);
}
