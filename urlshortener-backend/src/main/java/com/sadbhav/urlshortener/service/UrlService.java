package com.sadbhav.urlshortener.service;

public interface UrlService {
    String createShortCode(String originalUrl, Long userId);
    String getOriginalCode(String shortCode);
    java.util.List<com.sadbhav.urlshortener.model.Url> getUserUrls(long userId);

    void delete(String shortCode);
}
