package com.sadbhav.urlshortener.service;

import org.springframework.stereotype.Service;
import com.sadbhav.urlshortener.model.Url;
import com.sadbhav.urlshortener.repository.UrlRepository;
import com.sadbhav.urlshortener.util.Base62;

import java.util.Optional;

@Service
public class UrlServiceImpl implements UrlService{
    public final UrlRepository urlRepository;
    public final com.sadbhav.urlshortener.repository.UserRepository userRepository;
    
    public UrlServiceImpl(UrlRepository urlRepository, com.sadbhav.urlshortener.repository.UserRepository userRepository){
        this.urlRepository = urlRepository;
        this.userRepository = userRepository;
    }
    @Override
    public String createShortCode(String originalUrl, Long userId) {
        Base62 machine = new Base62();
        Url url = new Url();
        url.setOriginalUrl(originalUrl);
        if (userId != null) {
            userRepository.findById(userId).ifPresent(url::setUser);
        }
        urlRepository.save(url);
        Long id = url.getId();
        String shortCode = machine.encoder(id);
        url.setShortCode(shortCode);
        urlRepository.save(url);
        return shortCode;
    }

    @Override
    public String getOriginalCode(String shortCode) {
        Url url = urlRepository.findByShortCode(shortCode)
                .orElseThrow(() -> new com.sadbhav.urlshortener.exception.UrlNotFoundException("URL not found"));
        url.setClicks(url.getClicks() + 1);
        urlRepository.save(url);
        return url.getOriginalUrl();
    }

    @Override
    public java.util.List<Url> getUserUrls(long userId) {
        return urlRepository.findByUserUserId(userId);
    }

    @Override
    public void delete(String shortCode) {
        Url url = urlRepository.findByShortCode(shortCode)
                .orElseThrow(() -> new RuntimeException("URL not found"));
        urlRepository.delete(url);
    }
}
