package com.jisang.bangtong.repository.chatroom;

import com.jisang.bangtong.dto.chat.ChatReturnDto;
import com.jisang.bangtong.model.chat.Chat;
import com.jisang.bangtong.model.chatroom.Chatroom;
import java.util.List;
import java.util.Optional;

public interface ChatroomRepositoryCustom {
  Optional<List<Chatroom>> getChatroom(Long userId);
  List<Chat> getChats(Long chatroomId);
}
