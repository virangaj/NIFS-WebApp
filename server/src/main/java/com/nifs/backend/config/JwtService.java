package com.nifs.backend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    //create secret key from https://www.allkeysgenerator.com/ and minimum 256-bit

    private static final String SECRET_KEY = "7A24432646294A404E635266556A586E327234753778214125442A472D4B6150";

    //extract username
    public String extractUsername(String token) {
        return extractClaims(token, Claims::getSubject);
    }


    public String generateToken(UserDetails userDetails){

        HashMap<String, Object> claims = new HashMap<>();
        claims.put("roles", "Admin");

        return generateToken(claims, userDetails);
    }


    //extract token
    public <T> T extractClaims(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }


    //generate token
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails){

        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000*60*60*24))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();


    }


    //validate tokem
    public boolean isTokenValid(String token, UserDetails userDetails){
        try{
            final String username = extractUsername(token);
            return (username.equals(userDetails.getUsername()) && ! isTokenExpire(token));
        }catch(Exception e){
            System.out.println(e.toString());
            return false;
        }
    }

    // check weather token is expired
    private boolean isTokenExpire(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaims(token, Claims::getExpiration);
    }

    //extract all claims
    private Claims extractAllClaims(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    //get sign in key
    private Key getSignInKey() {
        byte[] keyByte = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyByte);
    }
}
