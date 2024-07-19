package com.jisang.bangtong;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@SpringBootApplication
public class BangtongApplication {

  public static void main(String[] args) {
    SpringApplication.run(BangtongApplication.class, args);
  }

}
