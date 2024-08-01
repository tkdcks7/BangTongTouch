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
  //  TODO: profileImage 참조로 변경
  private String profileImage = "https://i.pinimg.com/736x/1d/2d/85/1d2d855052d693b053a237d167091b38.jpg";

  public User toEntity() {
    return User.builder()
        .userNickname(nickname)
        .userEmail(email)
        .userProvider(provider)
        .build();
  }

}