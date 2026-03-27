package com.sadbhav.urlshortener.exception;

public class UrlNotFoundException extends ResourceNotFoundException{
    public UrlNotFoundException(String message){
        super("Url does not exist");
    }
    public UrlNotFoundException(String message, Throwable cause){
        super("Url does not exist",cause);
    }
}

// if we throw runtime exception for every type of error
// like for url not found and database error then global handler would get confused
// so we write custom names

// we extended RuntimeException because normal exception needed to thrown immediately
// but here we can bubble it up to GlobalHandler
