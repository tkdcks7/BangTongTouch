package com.jisang.bangtong.util;

import com.jisang.bangtong.constants.CookieConstants;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

@Component
public class CookieUtil {

  public void addCookie(HttpServletResponse response, String value) {
    Cookie cookie = new Cookie(CookieConstants.COOKIE_NAME, value);
    cookie.setPath("/");
    cookie.setHttpOnly(true);
//    https
//    cookie.setSecure(true);
    cookie.setMaxAge(CookieConstants.COOKIE_MAX_AGE);

    response.addCookie(cookie);
  }

  public void removeCookie(HttpServletRequest request, HttpServletResponse response) {
    Cookie[] cookies = request.getCookies();

    if (cookies != null) {
      for (Cookie cookie : cookies) {
        if (cookie.getName().equals(CookieConstants.COOKIE_NAME)) {
          cookie.setMaxAge(0);
          response.addCookie(cookie);

          break;
        }
      }
    }
  }

}
