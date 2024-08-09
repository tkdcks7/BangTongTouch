package com.jisang.bangtong.service.chat;

import com.jisang.bangtong.dto.chat.ChatDto;
import com.jisang.bangtong.dto.chat.SendDto;
import com.jisang.bangtong.model.chat.Chat;
import java.util.List;
import java.util.Map;
import org.springframework.web.multipart.MultipartFile;

public interface ChatService {

  Chat send(SendDto chatDto);
  List<Chat> getMessagesByRoom(Long roomId);
  void getOutOfRoom(Long roomId);
}
