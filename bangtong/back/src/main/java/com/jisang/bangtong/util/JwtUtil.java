package com.jisang.bangtong.util;

import com.jisang.bangtong.model.common.SecurityConstants;
import com.jisang.bangtong.model.user.User;
import com.jisang.bangtong.repository.user.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

  @Autowired
  private UserRepository userRepository;

  private final SecretKey key = Keys.hmacShaKeyFor(
      SecurityConstants.JWT_KEY.getBytes(StandardCharsets.UTF_8));

  // access token 생성
  public String generateAccessToken(String email, String role) {
    return Jwts.builder().issuer("bangtong").subject("JWT Token").claim("email", email)
        .claim("role", role).issuedAt(new Date())
        .expiration(new Date(System.currentTimeMillis() + SecurityConstants.JWT_EXPIRATION))
        .signWith(key).compact();
  }

  // refresh token 생성
  public String generateRefreshToken(String email) {
    return Jwts.builder().issuer("bangtong").subject("Refresh Token").claim("email", email)
        .issuedAt(new Date())
        .expiration(new Date(System.currentTimeMillis() + SecurityConstants.JWT_EXPIRATION))
        .signWith(key).compact();
  }

  // 토큰 검증
  public Claims validateToken(String token) {
    return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
  }

  public String extractToken(String bearerToken) {
    return bearerToken.substring(7);
  }

  // 토큰에서 이메일 추출
  public String getEmailFromToken(String bearerToken) {
    String token = extractToken(bearerToken);
    Claims claims = validateToken(token);
    return claims.get("email", String.class);

  }

  // 사용자의 토큰을 검증함.
  public boolean validateUserToken(String email, String token) {
    List<User> userList = userRepository.findByUserEmail(email);

    if (!userList.isEmpty()) {
      User user = userList.get(0);

      return token.equals(user.getActiveToken());
    }

    return false;
  }

  public boolean isTokenValid(String token) {
    try {
      Claims claims = validateToken(token);
      String email = claims.get("email", String.class);
      return validateUserToken(email, token);
    } catch (Exception e) {
      return false;
    }
  }
}