package com.jisang.bangtong.controller.chat;

import com.jisang.bangtong.dto.chat.ChatDto;
import com.jisang.bangtong.dto.chat.SendDto;
import com.jisang.bangtong.dto.chatroom.ChatroomDto;
import com.jisang.bangtong.dto.common.ResponseDto;
import com.jisang.bangtong.model.chat.Chat;
import com.jisang.bangtong.service.chat.ChatService;
import java.util.Date;
import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.HtmlUtils;

@RestController
@Slf4j
public class WebSocketChatController {

  private final SimpMessagingTemplate messagingTemplate;

  @Autowired
  private final ChatService chatService;

  public WebSocketChatController(SimpMessagingTemplate messagingTemplate, ChatService chatService) {
    this.messagingTemplate = messagingTemplate;
    this.chatService = chatService;
  }

  @MessageMapping("/hello/{ChatroomId}")  //받는 데
  @SendTo("/topic/greetings/{ChatroomId}")    //보내는곳
  public ResponseDto<String> greeting(@RequestBody Map<String, Object> chatdto) {
    Map<String, String> chat= (Map<String, String>) chatdto.get("chat");

    log.info("greeting {}", chat);
    SendDto sendDto = new SendDto();
    sendDto.setSender(Long.valueOf(String.valueOf(chat.get("sender"))));
    sendDto.setChatRoom(Long.valueOf(String.valueOf(chat.get("chatRoom"))));
    sendDto.setChatMessage(String.valueOf(chat.get("chatContent")));

    //sendDto.get
    try {
      chatService.send(sendDto);
      return new ResponseDto<>("SUCCESS",
          HtmlUtils.htmlEscape(sendDto.toString()));
    }catch (RuntimeException e){
      return new ResponseDto<>("ERROR", HtmlUtils.htmlEscape(e.getMessage()));
    }

  }

}
