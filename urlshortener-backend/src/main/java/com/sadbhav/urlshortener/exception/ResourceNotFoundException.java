package com.sadbhav.urlshortener.exception;

public abstract class ResourceNotFoundException extends RuntimeException{
    public ResourceNotFoundException(String message){
        super(message);
        // super passes message to RuntimeException
    }
    public ResourceNotFoundException(String message, Throwable cause){
        super(message,cause);
        // sometimes we throw the cause of error too
    }
}
