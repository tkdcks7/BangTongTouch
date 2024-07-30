package com.jisang.bangtong.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class ChatDto {
  Long chatRoom;
  Long sender;
  Long receiver;
  String chatMessage;
}
