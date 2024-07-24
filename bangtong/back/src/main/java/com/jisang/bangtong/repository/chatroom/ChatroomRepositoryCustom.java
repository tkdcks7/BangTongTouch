package com.jisang.bangtong.repository.chatroom;

import com.jisang.bangtong.model.chatroom.Chatroom;
import java.util.List;
import java.util.Optional;

public interface ChatroomRepositoryCustom {
  Optional<List<Chatroom>> getChatroom(Long userId);
}
