package com.jisang.bangtong.handler;

import com.jisang.bangtong.util.JwtUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

  private static final Logger log = LoggerFactory.getLogger(OAuth2SuccessHandler.class);
  private final JwtUtil jwtUtil;

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
      Authentication authentication) throws IOException, ServletException {
    OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
    Long userId = oAuth2User.getAttribute("id");
    String userEmail = oAuth2User.getAttribute("email");
    String userNickname = oAuth2User.getAttribute("nickname");

//    String accessToken = jwtUtil.generateAccessToken(userId, userEmail, userNickname, new Date());
//    String targetUrl = UriComponentsBuilder.fromUriString("/")
//        .queryParam("access_token", accessToken).build().toUriString();
//
//    System.out.println("accessToken: " + accessToken);
//    System.out.println("targetUrl: " + targetUrl);

    RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
    redirectStrategy.sendRedirect(request, response, "/");
  }

}