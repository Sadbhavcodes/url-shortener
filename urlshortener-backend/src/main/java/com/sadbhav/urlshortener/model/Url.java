package com.sadbhav.urlshortener.model;


//jakarta is a JPA library used to talk to database
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Entity
public class Url {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Column(unique = true)
    private String originalUrl;

    @Setter
    @Column(unique = true)
    private String shortCode;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Setter
    private int clicks = 0;

    @Setter
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Url(String originalUrl, String shortCode){
        this.originalUrl = originalUrl;
        this.shortCode = shortCode;
    }
    public Url(){
    }
}
