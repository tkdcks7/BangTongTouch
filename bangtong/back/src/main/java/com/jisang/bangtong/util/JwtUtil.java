package com.jisang.bangtong.util;

import com.jisang.bangtong.constants.SecurityConstants;
import com.jisang.bangtong.model.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.stream.Collectors;
import javax.crypto.SecretKey;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

  private final String secret = SecurityConstants.JWT_SECRET_DEFAULT_VALUE;
  private final SecretKey secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));

  public String generateAccessToken(User user, Authentication authenticationResponse,
      Date currentDate) {
    return Jwts.builder()
        .issuer("bangtong")
        .subject("U" + user.getUserId())
        .claim("email", user.getUserEmail())
        .claim("authorities",
            authenticationResponse.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(",")))
        .issuedAt(currentDate)
        .expiration(new Date(currentDate.getTime() + SecurityConstants.JWT_EXPIRES_IN))
        .signWith(secretKey)
        .compact();
  }

  public String generateRefreshToken(User user, Authentication authenticationResponse,
      Date currentDate) {
    return Jwts.builder()
        .issuer("bangtong")
        .subject("U" + user.getUserId())
        .claim("email", user.getUserEmail())
        .claim("authorities",
            authenticationResponse.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(",")))
        .issuedAt(currentDate)
        .expiration(new Date(currentDate.getTime() + SecurityConstants.JWT_REFRESH_EXPIRES_IN))
        .signWith(secretKey)
        .compact();
  }

  public String parseToken(String token) {
    Claims claims = Jwts.parser()
        .verifyWith(secretKey)
        .build()
        .parseSignedClaims(token)
        .getPayload();

    return claims.getSubject();
  }

}