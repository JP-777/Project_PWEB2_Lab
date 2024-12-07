package manage_users_backend.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class AuthService {

    @PostConstruct
    public void init() {
        System.out.println("JWT Secret: " + jwtSecret);
    }

    @Value("${jwt.secret:defaultSecretKey}")
    private String jwtSecret;

    private String generateJwtSecret() {
        if (jwtSecret == null || jwtSecret.isEmpty()) {
            return "defaultSecretKey1234567890!";
        }
        return jwtSecret;
    }

    public String generateJwtToken(Authentication authentication) {
        User userPrincipal = (User) authentication.getPrincipal();

        
        String secret = generateJwtSecret();
        if (secret == null || secret.isEmpty()) {
            throw new IllegalArgumentException("JWT Secret no puede ser null o vacío");
        }

        return Jwts.builder()
            .setSubject(userPrincipal.getUsername())
            .setIssuedAt(new Date())
            .setExpiration(new Date((new Date()).getTime() + 86400000)) 
            .signWith(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)), SignatureAlgorithm.HS512)
            .compact();
    }
}
