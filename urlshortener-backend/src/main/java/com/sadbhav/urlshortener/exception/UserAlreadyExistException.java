package com.sadbhav.urlshortener.exception;

public class UserAlreadyExistException extends ResourceConflictException{
    public UserAlreadyExistException(){
        super("User already exist");
    }

}
