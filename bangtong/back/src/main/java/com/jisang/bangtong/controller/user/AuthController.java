package com.jisang.bangtong.controller.user;

import com.jisang.bangtong.dto.common.ResponseDto;
import com.jisang.bangtong.model.user.JwtResponse;
import com.jisang.bangtong.repository.user.AuthenticationService;
import com.jisang.bangtong.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

  private final AuthenticationService authenticationService;
  private final JwtTokenUtil jwtTokenUtil;

  @Autowired
  public AuthController(AuthenticationService authenticationService, JwtTokenUtil jwtTokenUtil) {
    this.authenticationService = authenticationService;
    this.jwtTokenUtil = jwtTokenUtil;
  }

  @PostMapping("/login")
  public ResponseDto<JwtResponse> createAuthenticationToken(
      @RequestParam("username") String username,
      @RequestParam("password") String password) {
    Authentication authentication = authenticationService.authenticate(username, password);
    final String token = jwtTokenUtil.generateToken(authentication.getName());

    return ResponseDto.res("success", new JwtResponse(token));
  }

}