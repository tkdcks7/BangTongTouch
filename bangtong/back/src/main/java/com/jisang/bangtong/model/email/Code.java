package com.jisang.bangtong.model.email;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

@RedisHash
@Data
public class Code {

  @Id
  private String email;

  private String code;

  @TimeToLive
  private long ttl = 300L;

  public Code(String code, String email) {
    this.code = code;
    this.email = email;
  }

}