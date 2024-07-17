package com.jisang.bangtong.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import javax.crypto.SecretKey;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

public class JWTTokenValidatorFilter extends OncePerRequestFilter {

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
    String HEADER = "Authorization";
    String jwt = request.getHeader(HEADER);
    if (null != jwt) {
      try {
        String KEY = "7Iz876W0p0CmXaJY5TOkw5H4/+RE/G6Shd4+zW+UBGw=";
        SecretKey key = Keys.hmacShaKeyFor(
            KEY.getBytes(StandardCharsets.UTF_8));

        Claims claims = Jwts.parser()
            .verifyWith(key)
            .build()
            .parseSignedClaims(jwt)
            .getPayload();
        String username = String.valueOf(claims.get("username"));
        String authorities = (String) claims.get("authorities");
        Authentication auth = new UsernamePasswordAuthenticationToken(username, null,
            AuthorityUtils.commaSeparatedStringToAuthorityList(authorities));
        SecurityContextHolder.getContext().setAuthentication(auth);
      } catch (Exception e) {
        throw new BadCredentialsException("Invalid Token received!");
      }

    }
    filterChain.doFilter(request, response);
  }

  @Override
  protected boolean shouldNotFilter(HttpServletRequest request) {
    return request.getServletPath().equals("/users");
  }

}
