package com.sadbhav.urlshortener.repository;

import com.sadbhav.urlshortener.model.Url;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UrlRepository extends JpaRepository<Url, Long>{
    // <Url, Long> tells JPA which table to work with and what is the datatype of primary key
    Optional<Url> findByShortCode(String shortCode);

    Optional<Url> findByOriginalUrl(String originalUrl);

    java.util.List<Url> findByUserUserId(long userId);
}

// we use optional in order to return empty instead of crashing the program when url is not found in our db
// the other methods like save or update are already in JpaRepository

