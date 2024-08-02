package com.jisang.bangtong.filter;

import com.jisang.bangtong.constants.SecurityConstants;
import com.jisang.bangtong.model.user.User;
import com.jisang.bangtong.repository.user.UserRepository;
import com.jisang.bangtong.util.JwtUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
public class JwtTokenValidatorFilter extends OncePerRequestFilter {

  private final UserRepository userRepository;
  private final JwtUtil jwtUtil;

  public JwtTokenValidatorFilter(UserRepository userRepository, JwtUtil jwtUtil) {
    this.userRepository = userRepository;
    this.jwtUtil = jwtUtil;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
    String header = request.getHeader(SecurityConstants.JWT_HEADER);

    if (header != null && header.startsWith("Bearer ")) {
      String token = header.substring(7);

      try {
        String email = jwtUtil.getUserEmailFromToken(token);
        String authorities = jwtUtil.parseToken(token).get("authorities").toString();
        User user = userRepository.findByUserEmail(email).orElse(null);

        if (user == null) {
          throw new BadCredentialsException(SecurityConstants.JWT_INVALID_TOKEN);
        }

        Authentication authentication = new UsernamePasswordAuthenticationToken(email, null,
            AuthorityUtils.commaSeparatedStringToAuthorityList(authorities));

        SecurityContextHolder.getContext().setAuthentication(authentication);
      } catch (ExpiredJwtException e) {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("만료된 토큰입니다.");
        return;
      } catch (Exception e) {
        throw new BadCredentialsException(SecurityConstants.JWT_INVALID_TOKEN);
      }
    }

    filterChain.doFilter(request, response);
  }

  @Override
  protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
    return request.getServletPath().equals("/users/user");
  }

}
