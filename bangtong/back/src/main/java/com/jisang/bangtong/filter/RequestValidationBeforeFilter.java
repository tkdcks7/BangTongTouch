package com.jisang.bangtong.filter;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.util.StringUtils;

@Slf4j
public class RequestValidationBeforeFilter implements Filter {

  public static final String AUTHENTICATION_SCHEME_BASIC = "Basic";
  private final Charset credentialsCharset = StandardCharsets.UTF_8;

  @Override
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse,
      FilterChain filterChain) throws IOException, ServletException {
    HttpServletRequest request = (HttpServletRequest) servletRequest;
    HttpServletResponse response = (HttpServletResponse) servletResponse;

    String header = request.getHeader(AUTHORIZATION);

    if (header != null && StringUtils.startsWithIgnoreCase(header, AUTHENTICATION_SCHEME_BASIC)) {
      header = header.trim();
      byte[] base64Token = header.substring(6).getBytes(credentialsCharset);
      byte[] decoded;

      try {
        decoded = Base64.getDecoder().decode(base64Token);
        String decodedString = new String(decoded, credentialsCharset);
        int delim = decodedString.indexOf(':');

        if (delim == -1) {
          throw new BadCredentialsException("유효하지 않은 토큰입니다.");
        }

        String username = decodedString.substring(0, delim);

        if (username.toLowerCase().contains("test")) {
          response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
          return;
        }
      } catch (IllegalArgumentException e) {
        throw new BadCredentialsException("기본 인증에 실패했습니다.");
      }
    }

    filterChain.doFilter(request, response);
  }

}
