package com.jisang.bangtong.dto.chatroom;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Data
@Slf4j
public class ChatroomDto {

  String title;
  Long user1Id;
  Long user2Id;
  Long productId;
}
