package com.sadbhav.urlshortener.exception;

import java.sql.Timestamp;
import java.time.LocalDateTime;

public record ErrorResponse(
        // to define the standard JSON response of our errors
        int status,
        String error,
        String message,
        LocalDateTime timestamp
) {
}
