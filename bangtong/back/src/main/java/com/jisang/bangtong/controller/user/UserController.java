package com.jisang.bangtong.controller.user;

import com.jisang.bangtong.constants.ResponseMessageConstants;
import com.jisang.bangtong.constants.SecurityConstants;
import com.jisang.bangtong.dto.common.ResponseDto;
import com.jisang.bangtong.dto.user.LoginRequestDto;
import com.jisang.bangtong.dto.user.RegisterRequestDto;
import com.jisang.bangtong.dto.user.UserDto;
import com.jisang.bangtong.model.user.User;
import com.jisang.bangtong.service.user.UserService;
import com.jisang.bangtong.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
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

  private final JwtUtil jwtUtil;
  private UserService userService;
  private PasswordEncoder passwordEncoder;

  //  회원가입 (일반)
  @PostMapping("/register")
  public ResponseDto<User> register(@RequestBody RegisterRequestDto registerRequestDto) {
    userService.register(registerRequestDto);

    return ResponseDto.res(ResponseMessageConstants.SUCCESS);
  }

  //  회원탈퇴
  @DeleteMapping("/delete")
  public ResponseDto<Void> delete(HttpServletRequest request) {
    Long userId = jwtUtil.getUserIdFromToken(jwtUtil.getAccessToken(request));
    String message = userService.delete(userId);

    return ResponseDto.res(message);
  }

  //  로그인 (일반)
  @PostMapping("/login")
  public ResponseEntity<ResponseDto<UserDto>> login(@RequestBody LoginRequestDto loginRequest) {
    Map<String, Object> map = userService.login(loginRequest);

    return ResponseEntity.status(HttpStatus.OK)
        .header(SecurityConstants.JWT_HEADER, (String) map.get("accessToken"))
        .body(ResponseDto.res(ResponseMessageConstants.SUCCESS, (UserDto) map.get("user")));
  }

  //  로그아웃
  @PutMapping("/logout")
  public ResponseDto<Void> logout(HttpServletRequest request, HttpServletResponse response) {
    userService.logout(request, response);

    return ResponseDto.res(ResponseMessageConstants.SUCCESS);
  }

}