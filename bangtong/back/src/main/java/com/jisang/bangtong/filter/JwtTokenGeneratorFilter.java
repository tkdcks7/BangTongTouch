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
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.crypto.SecretKey;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

public class JwtTokenGeneratorFilter extends OncePerRequestFilter {

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    if (authentication != null) {
      SecretKey key = Keys.hmacShaKeyFor(
          SecurityConstants.JWT_KEY.getBytes(StandardCharsets.UTF_8));

      String jwt = Jwts.builder()
          .issuer("bangtong")
          .subject(authentication.getName())
          .claim("username", authentication.getName())
          .claim("authorities", populateAuthorities(authentication.getAuthorities()))
          .issuedAt(new Date())
          .expiration(new Date((new Date()).getTime() + 30000000))
          .signWith(key).compact();

      response.setHeader(SecurityConstants.JWT_HEADER, jwt);
    }

    filterChain.doFilter(request, response);
  }

  @Override
  protected boolean shouldNotFilter(HttpServletRequest request) {
    return !request.getServletPath().equals("/users/user");
  }

  private String populateAuthorities(Collection<? extends GrantedAuthority> authorities) {
    Set<String> authoritiesSet = new HashSet<>();

    for (GrantedAuthority authority : authorities) {
      authoritiesSet.add(authority.getAuthority());
    }

    return String.join(",", authoritiesSet);
  }

}
