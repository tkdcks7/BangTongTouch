package com.jisang.bangtong.dto.chatroom;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.jisang.bangtong.model.product.Product;
import com.jisang.bangtong.model.user.User;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.util.Date;
import lombok.Data;

@Data
public class ChatroomReturnDto {
  Long chatroomId;
  Product product;
  User user;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss.SSS")
  @Temporal(TemporalType.TIMESTAMP)
  Date chatroomCreatedAt;
}
