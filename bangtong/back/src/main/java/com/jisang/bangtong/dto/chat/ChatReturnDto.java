package com.jisang.bangtong.dto.chat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.jisang.bangtong.model.user.User;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.util.Date;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

@Data
public class ChatReturnDto {
  User sender;
  User receiver;
  String chatContent;

  @Temporal(TemporalType.TIMESTAMP)
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
  Date chatTime;
}
