package com.sadbhav.urlshortener.model;

import com.sadbhav.urlshortener.enums.Role;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;

    @Setter
    @NotBlank(message = "Username cannot be blank")
    @Column(unique = true, nullable = false)
    private String username;

    @Setter
    @NotBlank(message = "Password cannot be blank")
    @Column(nullable = false) // nullable does not even allow a null field to get a row in that column at database level
    private String password;

    @Setter
    private Role role = Role.ROLE_USER; // using separate enum classes for fixing fields and avoiding gibberish string

    public User(){}
    public User(String username, String password){
        this.username = username;
        this.password = password;
    }
}
