package com.jisang.bangtong.controller.user;

import com.jisang.bangtong.dto.common.ResponseDto;
import com.jisang.bangtong.dto.user.LoginRequestDTO;
import com.jisang.bangtong.dto.user.LoginResponseDTO;
import com.jisang.bangtong.model.common.SecurityConstants;
import com.jisang.bangtong.model.user.User;
import com.jisang.bangtong.service.user.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@Slf4j
public class UserController {

  @Autowired
  private UserService userService;
  @Autowired
  private PasswordEncoder passwordEncoder;

  @PostMapping("/register")
  public ResponseDto<User> register(@RequestBody User user) {
    String password = passwordEncoder.encode(user.getUserPassword());
    user.setUserPassword(password);

    userService.register(user);

    return ResponseDto.res("success", user);
  }

  @DeleteMapping("/delete/{userId}")
  public ResponseDto<Void> delete(@PathVariable Long userId) {
    userService.delete(userId);
    return ResponseDto.res("success");
  }

  @PostMapping("/login")
  public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequest) {
    String token = userService.login(loginRequest);

    return ResponseEntity.status(HttpStatus.OK).header(SecurityConstants.JWT_HEADER, token)
        .body(new LoginResponseDTO(HttpStatus.OK.getReasonPhrase(), token));
  }

}
