package com.jisang.bangtong.controller.chat;

import com.jisang.bangtong.dto.chat.ChatDto;
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
//  public ResponseDto<String> greeting(String message) throws Exception {
//    log.info(message);
//    return new ResponseDto<>("SUCCESS",
//        HtmlUtils.htmlEscape(message));
//  }
  public ResponseDto<String> greeting(@RequestPart Map<String, Object> message) throws Exception {
    Map<String, Object> obj = (Map<String, Object>) message.get("chat");

    log.info("{}", obj);

    chatService.send(obj, null);

    return new ResponseDto<>("SUCCESS",
        HtmlUtils.htmlEscape(obj.toString()));
  }

}
