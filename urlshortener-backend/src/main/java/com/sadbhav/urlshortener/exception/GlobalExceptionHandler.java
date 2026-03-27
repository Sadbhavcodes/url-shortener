package com.sadbhav.urlshortener.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
// This tells Spring, "Hey, listen to every Controller in this app, and if an exception happens, send it to this class."
public class GlobalExceptionHandler{

    @ExceptionHandler(UrlNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUrlNotFound(UrlNotFoundException ex){
        return responseBuilder(HttpStatus.NOT_FOUND,ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex){
        // throws the error message of first error received
        String message = ex.getBindingResult().getFieldErrors().get(0).getDefaultMessage();
        return responseBuilder(HttpStatus.BAD_REQUEST, message);
    }
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFound(UserNotFoundException ex){
        return responseBuilder(HttpStatus.NOT_FOUND, ex.getMessage());
    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        // Log the exception securely behind the scenes (in a real app you'd use a logger)
        System.err.println("Unhandled exception occurred: " + ex.getMessage());
        return responseBuilder(HttpStatus.INTERNAL_SERVER_ERROR, "An unexpected error occurred. Please try again later.");
    }

    // helper function to avoid coding again and again
    private ResponseEntity<ErrorResponse> responseBuilder(HttpStatus status,String message){
        ErrorResponse errorResponse = new ErrorResponse(
                status.value(),
                status.getReasonPhrase(),
                message,
                LocalDateTime.now()
        );
                return new ResponseEntity<>(errorResponse,status);
    }
}
// every method returns a json response of standard error messages and status
