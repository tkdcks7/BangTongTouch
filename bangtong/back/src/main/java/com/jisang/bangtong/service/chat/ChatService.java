package com.jisang.bangtong.service.chat;

import com.jisang.bangtong.model.chat.Chat;
import java.util.List;

public interface ChatService {

  void send(Chat chat);

  List<Chat> getMessagesByRoom(Long roomId);
}
