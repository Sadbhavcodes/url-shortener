package com.sadbhav.urlshortener.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sadbhav.urlshortener.service.UrlService;

import java.net.URI;

import com.sadbhav.urlshortener.dto.*;

@RestController
@RequestMapping("/api/v1/urls")
public class UrlController {
    @Autowired
    private UrlService urlService; // dependency injection using autowired for decoupling

    // API endpoint 1
    @PostMapping("/shorten")
    public ResponseEntity<UrlResponse> shortenUrl(@RequestBody UrlRequest request) {
        String code = urlService.createShortCode(request.getLongUrl(), request.getUserId());
        return ResponseEntity.status(HttpStatus.CREATED).body(new UrlResponse(code));
    }

    // API endpoint 2
    @GetMapping("/{shortCode}")
    public ResponseEntity<Void> redirectUrl(@PathVariable String shortCode) {
        String originalUrl = urlService.getOriginalCode(shortCode);
        return ResponseEntity.status(HttpStatus.FOUND).location(URI.create(originalUrl)).build();
    }

    // API endpoint 3
    @DeleteMapping("/{shortCode}")
    public ResponseEntity<Void> delete(@PathVariable String shortCode) {
        urlService.delete(shortCode);

        // Return 204 No Content (Standard for successful deletes)
        return ResponseEntity.noContent().build();
    }

    // API endpoint 4: Get user history
    @GetMapping("/user/{userId}")
    public ResponseEntity<java.util.List<com.sadbhav.urlshortener.model.Url>> getUserUrls(@PathVariable Long userId) {
        return ResponseEntity.ok(urlService.getUserUrls(userId));
    }
} 