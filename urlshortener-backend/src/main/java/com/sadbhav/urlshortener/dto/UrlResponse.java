package com.sadbhav.urlshortener.dto;
public class UrlResponse {
    // what the user receives
    private String shortCode;

    public UrlResponse(String code) {
        this.shortCode = code;
    }
    public String getShortCode(){ return shortCode;}
}

// The DTO acts as a "Contract." It says: "Regardless of how I store data in SQL, I promise the frontend will always receive exactly these 3 fields."
