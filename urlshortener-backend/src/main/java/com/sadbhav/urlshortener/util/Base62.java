package com.sadbhav.urlshortener.util;

public class Base62 {
    public static final String CHARSET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    public String encoder(Long id){
        StringBuilder result = new StringBuilder();
        while(id > 0){
            int remainder = (int) (id % 62);
            result.append(CHARSET.charAt(remainder));
            id = id / 62;
        }
        return result.reverse().toString();
    }
}
