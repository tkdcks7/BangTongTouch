package com.jisang.bangtong.service.chat;

import com.jisang.bangtong.model.chat.Chat;
import java.util.List;
import java.util.Map;
import org.springframework.web.multipart.MultipartFile;

public interface ChatService {

  Chat send(Map<String, Object> chat);

  List<Chat> getMessagesByRoom(Long roomId);
}
