package com.jisang.bangtong.controller.user;

import com.jisang.bangtong.constants.SecurityConstants;
import com.jisang.bangtong.dto.common.ResponseDto;
import com.jisang.bangtong.dto.user.LoginRequestDTO;
import com.jisang.bangtong.model.user.User;
import com.jisang.bangtong.service.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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

  private UserService userService;
  private PasswordEncoder passwordEncoder;

  @PostMapping("/register")
  public ResponseDto<User> register(@RequestBody User user) {
    String password = passwordEncoder.encode(user.getUserPassword());
    user.setUserPassword(password);

    userService.register(user);

    return ResponseDto.res("success", user);
  }

  @DeleteMapping("/delete")
  public ResponseDto<Void> delete() {
    Long userId = 0L;
    userService.delete(userId);

    return ResponseDto.res("success");
  }

  @PostMapping("/login")
  public ResponseEntity<ResponseDto<Void>> login(@RequestBody LoginRequestDTO loginRequest) {
    String accessToken = userService.login(loginRequest);

    return ResponseEntity.status(HttpStatus.OK).header(SecurityConstants.JWT_HEADER, accessToken)
        .body(ResponseDto.res(accessToken));
  }

  @PutMapping("/logout")
  public ResponseDto<Void> logout(HttpServletRequest request, HttpServletResponse response) {
    userService.logout(request, response);
    return ResponseDto.res("success");
  }

}