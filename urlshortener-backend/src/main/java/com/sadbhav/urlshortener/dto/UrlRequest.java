package com.sadbhav.urlshortener.dto;

import jakarta.validation.constraints.NotBlank;

public class UrlRequest {
    // what the user sends us

    @NotBlank(message = "URL cannot be blank")
    @org.hibernate.validator.constraints.URL(message = "Invalid URL format")
    private String longUrl;

    private Long userId;

    public void setLongUrl(String longUrl){this.longUrl = longUrl;}
    public String getLongUrl(){ return longUrl;}

    public void setUserId(Long userId) { this.userId = userId; }
    public Long getUserId() { return userId; }
}
