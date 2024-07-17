package com.jisang.bangtong.filter;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

public class JWTTokenGeneratorFilter extends OncePerRequestFilter {

  @Value("${jwt.key}")
  private String KEY;
  @Value("${jwt.header}")
  private String HEADER;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (null != authentication) {
      SecretKey key = Keys.hmacShaKeyFor(
          KEY.getBytes(StandardCharsets.UTF_8));
      String jwt = Jwts.builder().issuer("bangtong").subject("JWT Token")
          .claim("username", authentication.getName())
          .claim("authorities", populateAuthorities(authentication.getAuthorities()))
          .issuedAt(new Date())
          .expiration(new Date((new Date()).getTime() + 30000000))
          .signWith(key).compact();
      response.setHeader(HEADER, jwt);
    }

    filterChain.doFilter(request, response);
  }

  @Override
  protected boolean shouldNotFilter(HttpServletRequest request) {
    return !request.getServletPath().equals("/users");
  }

  private String populateAuthorities(Collection<? extends GrantedAuthority> collection) {
    Set<String> authoritiesSet = new HashSet<>();

    for (GrantedAuthority authority : collection) {
      authoritiesSet.add(authority.getAuthority());
    }
    
    return String.join(",", authoritiesSet);
  }

}
