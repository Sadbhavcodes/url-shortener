package com.sadbhav.urlshortener.exception;

public class UserNotFoundException extends ResourceNotFoundException{
    public UserNotFoundException(){
        super("User does not exist");
    }
    public UserNotFoundException(Throwable cause){
        super("User does not exist",cause);
    }
}
