package com.jisang.bangtong.service.chat;

import com.jisang.bangtong.model.chat.Chat;
import com.jisang.bangtong.repository.chat.ChatRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatServiceImpl implements ChatService {

  @Autowired
  ChatRepository chatRepository;

  @Override
  public void send(Chat chat) {
    chatRepository.save(chat);
  }

  @Override
  public List<Chat> getMessagesByRoom(Long roomId) {
    Optional<List<Chat>> chats = chatRepository.findByChatRoom_ChatroomId(roomId);
    if(chats.isPresent()){
      return chats.get();
    }else{
      throw new RuntimeException("chatroom not found");
    }
  }
}
