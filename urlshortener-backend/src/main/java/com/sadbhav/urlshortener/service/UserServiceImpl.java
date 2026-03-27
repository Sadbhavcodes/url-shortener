package com.sadbhav.urlshortener.service;

import com.sadbhav.urlshortener.dto.*;
import com.sadbhav.urlshortener.enums.Role;
import com.sadbhav.urlshortener.exception.UrlNotFoundException;
import com.sadbhav.urlshortener.exception.UserAlreadyExistException;
import com.sadbhav.urlshortener.exception.UserNotFoundException;
import com.sadbhav.urlshortener.model.User;
import com.sadbhav.urlshortener.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private com.sadbhav.urlshortener.util.JwtUtils jwtUtils;

    @Override
    public UserResponse registerUser(UserRequest userRequest) {
        if (userRepository.existsByUsername(userRequest.getUsername())) {
            throw new UserAlreadyExistException();
        }
        User user = new User();
        user.setUsername(userRequest.getUsername());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        user.setRole(Role.ROLE_USER);
        User savedUser = userRepository.save(user);
        return mapToResponse(savedUser);
    }

    private UserResponse mapToResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getUserId());
        response.setUsername(user.getUsername());
        response.setRole(user.getRole());
        response.setMessage("User registered successfully!");
        response.setToken(jwtUtils.generateToken(user));
        return response;
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public UserResponse upgradeToPremium(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setRole(Role.ROLE_PREMIUM);
        userRepository.save(user);

        UserResponse response = new UserResponse();
        response.setRole(user.getRole());
        response.setMessage("User successfully upgraded to premium");
        return response;
    }

    public LoginResponse loginUser(LoginRequest loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(UserNotFoundException::new);
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Password does not match! Try again");
        }
        LoginResponse response = new LoginResponse();
        response.setUsername(user.getUsername());
        response.setId(String.valueOf(user.getUserId()));
        response.setRole(user.getRole());
        response.setMessage("Login Successful!");
        response.setToken(jwtUtils.generateToken(user));
        return response;
    }
}