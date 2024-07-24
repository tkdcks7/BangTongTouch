package com.jisang.bangtong.dto.user;

import com.jisang.bangtong.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
public class UserDto {

  private Long id;
  private String email;
  private String provider;
  private String nickname;

  public User toEntity() {
    return User.builder()
        .userNickname(nickname)
        .userEmail(email)
        .userProvider(provider)
        .build();
  }

}