package com.jisang.bangtong.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

  private Long id;
  private String email;
  private String password;
  private String nickname;
  private String role;

}
