package com.jisang.bangtong.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

  private Long id;
  private String name;
  private String email;
  private String password;
  private int birthYear;
  private String phone;
  private String nickname;
  private boolean isAdmin;

}
