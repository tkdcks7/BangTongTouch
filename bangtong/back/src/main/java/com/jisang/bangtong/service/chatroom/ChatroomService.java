package com.jisang.bangtong.service.chatroom;

import com.jisang.bangtong.dto.chatroom.ChatroomDto;
import com.jisang.bangtong.dto.chatroom.ChatroomReturnDto;
import com.jisang.bangtong.model.chatroom.Chatroom;
import java.util.List;

public interface ChatroomService {

  void createChatroom(ChatroomDto chatroomDto);
  void endChatroom(Long chatroomIId);
  List<ChatroomReturnDto> getChatroom(Long userId);
}
