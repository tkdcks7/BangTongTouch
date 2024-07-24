package com.jisang.bangtong.controller.chat;

import com.jisang.bangtong.model.chat.Chat;
import com.jisang.bangtong.service.chat.ChatService;
import java.util.Date;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;

@Controller
@Slf4j
public class WebSocketChatController {

  private final SimpMessagingTemplate messagingTemplate;

  public WebSocketChatController(SimpMessagingTemplate messagingTemplate) {
    this.messagingTemplate = messagingTemplate;
  }

  @MessageMapping("/chat")
  public void sendMessageToRoom(Chat chat) {
    messagingTemplate.convertAndSend("/topic/chatroom/"+chat.getChatRoom().getChatroomId(), chat);
  }
}
