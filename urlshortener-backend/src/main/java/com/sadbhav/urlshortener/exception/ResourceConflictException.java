package com.sadbhav.urlshortener.exception;

public abstract class ResourceConflictException extends RuntimeException{
    public ResourceConflictException(String message){
        super(message);
    }
}
