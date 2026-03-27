package com.sadbhav.urlshortener.dto;

import jakarta.validation.constraints.NotBlank;

public class UrlDelete {
    @NotBlank(message = "Short Url cannot be blank")
    private String shortCode;

    public void setShortCode(String shortCode){ this.shortCode = shortCode;}
    public String getShortCode(){ return shortCode;}

    public UrlDelete(String shortCode){
        this.shortCode = shortCode;
    }
}
