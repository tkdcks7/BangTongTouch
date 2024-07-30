package com.jisang.bangtong.controller.user;

import com.jisang.bangtong.constants.SecurityConstants;
import com.jisang.bangtong.dto.common.ResponseDto;
import com.jisang.bangtong.dto.user.LoginRequestDTO;
import com.jisang.bangtong.model.user.User;
import com.jisang.bangtong.service.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
@Slf4j
public class UserController {

  private UserService userService;
  private PasswordEncoder passwordEncoder;

  @GetMapping("/test")
  public ResponseDto<Void> test() {
    return ResponseDto.res("oauth test success");
  }

  //  회원가입 (일반)
  @PostMapping("/register")
  public ResponseDto<User> register(@RequestBody User user) {
    String password = passwordEncoder.encode(user.getUserPassword());
    user.setUserPassword(password);

    userService.register(user);

    return ResponseDto.res("success", user);
  }

  //  회원탈퇴
  @DeleteMapping("/delete")
  public ResponseDto<Void> delete() {
    Long userId = 0L;
    userService.delete(userId);

    return ResponseDto.res("success");
  }

  //  로그인 (일반)
  @PostMapping("/login")
  public ResponseEntity<ResponseDto<Void>> login(@RequestBody LoginRequestDTO loginRequest) {
    Map<String, String> tokens = userService.login(loginRequest);
    String accessToken = tokens.get("access_token");
    String refreshToken = tokens.get("refresh_token");

    return ResponseEntity.status(HttpStatus.OK).header(SecurityConstants.JWT_HEADER, accessToken)
        .body(ResponseDto.res(accessToken));
  }

  //  로그아웃
  @PutMapping("/logout")
  public ResponseDto<Void> logout(HttpServletRequest request, HttpServletResponse response) {
    userService.logout(request, response);

    return ResponseDto.res("success");
  }

}