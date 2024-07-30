package com.jisang.bangtong.controller.common;

import com.jisang.bangtong.model.user.User;
import com.jisang.bangtong.repository.user.UserRepository;
import com.jisang.bangtong.util.JwtUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

  private final JwtUtil jwtUtil;
  private final AuthenticationManager authenticationManager;
  private final UserRepository userRepository;
  private static final String URI = "/auth/success";

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
      Authentication authentication) throws IOException, ServletException {
    Authentication authenticationResponse = authenticationManager.authenticate(authentication);

    if (authenticationResponse.isAuthenticated()) {
      String email = authenticationResponse.getName();
      User user = userRepository.findByUserEmail(email).orElse(null);

      String accessToken = jwtUtil.generateAccessToken(user, authenticationResponse, new Date());
    }
  }

}