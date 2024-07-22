package com.jisang.bangtong.controller.user;

import com.jisang.bangtong.dto.common.ResponseDto;
import com.jisang.bangtong.model.user.JwtResponse;
import com.jisang.bangtong.service.user.AuthenticationService;
import com.jisang.bangtong.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {

  private final AuthenticationService authenticationService;
  private final JwtUtil jwtUtil;

  @PostMapping("/login")
  public ResponseEntity<ResponseDto<JwtResponse>> createAuthenticationToken(
      @RequestParam("username") String username,
      @RequestParam("password") String password) {
    Authentication authentication = authenticationService.authenticate(username, password);
    final String token = jwtUtil.generateAccessToken(username,
        authentication.getAuthorities().toString());

    HttpHeaders headers = new HttpHeaders();
    headers.set("Authorization", "Bearer " + token);

    return ResponseEntity.ok().headers(headers)
        .body(ResponseDto.res("success", new JwtResponse(token)));
  }

}