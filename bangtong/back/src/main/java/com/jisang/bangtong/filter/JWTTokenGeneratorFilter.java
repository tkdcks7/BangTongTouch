package com.jisang.bangtong.filter;

import com.jisang.bangtong.model.common.SecurityConstants;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.stream.Collectors;
import javax.crypto.SecretKey;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

public class JWTTokenGeneratorFilter extends OncePerRequestFilter {

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    if (authentication != null) {
      String secret = SecurityConstants.JWT_SECRET_DEFAULT_VALUE;
      SecretKey secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));

      String jwt = Jwts.builder().issuer("bangtong").subject("JWT Token")
          .claim("username", authentication.getName()).claim("authorities",
              authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                  .collect(Collectors.joining(","))).issuedAt(new Date())
          .expiration(new Date((new Date()).getTime() + SecurityConstants.JWT_EXPIRES_IN))
          .signWith(secretKey).compact();

      response.setHeader(SecurityConstants.JWT_HEADER, jwt);
    }

    filterChain.doFilter(request, response);
  }

  @Override
  protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
    return !request.getServletPath().equals("/users/user");
  }

}
