package com.jisang.bangtong.model.user;

import lombok.Data;

@Data
public class LoginRequest {

  private String username;
  private String password;
  
}