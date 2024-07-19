package com.jisang.bangtong.controller.user;

import com.jisang.bangtong.dto.common.ResponseDto;
import com.jisang.bangtong.model.user.User;
import com.jisang.bangtong.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
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

}
