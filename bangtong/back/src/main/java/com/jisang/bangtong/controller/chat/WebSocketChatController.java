package com.jisang.bangtong.controller.chat;

import com.jisang.bangtong.dto.chat.ChatDto;
import com.jisang.bangtong.dto.chat.SendDto;
import com.jisang.bangtong.dto.chatroom.ChatroomDto;
import com.jisang.bangtong.dto.common.ResponseDto;
import com.jisang.bangtong.model.chat.Chat;
import com.jisang.bangtong.service.chat.ChatService;
import java.text.SimpleDateFormat;
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
    log.info("greeting {}", chatdto);

    Map<String, String> chat= (Map<String, String>) chatdto.get("chat");

    log.info("greeting {}", chat);
    SendDto sendDto = new SendDto();
    sendDto.setSender(Long.valueOf(String.valueOf(chat.get("sender"))));
    sendDto.setChatRoom(Long.valueOf(String.valueOf(chat.get("chatRoom"))));

    // HTML 엔티티 디코딩 적용
    String decodedMessage = decodeHtmlEntities(String.valueOf(chat.get("chatContent")));
    sendDto.setChatMessage(decodedMessage);

    //sendDto.get
    try {
      chatService.send(sendDto);
      SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
      // 디코딩된 데이터를 사용하여 클라이언트에 보내기 위해 JSON 문자열 작성
      String responseData = String.format("{chatRoom:%d, sender:%d, chatMessage:%s, chatTime:%s}",
          sendDto.getChatRoom(),
          sendDto.getSender(),
          HtmlUtils.htmlEscape(sendDto.getChatMessage()), // this will escape any additional HTML characters
          formatter.format(sendDto.getChatTime())
           // 또는 필요에 맞게 시간을 포맷
      );
      return new ResponseDto<>("SUCCESS", responseData);
    }catch (RuntimeException e){
      return new ResponseDto<>("ERROR", HtmlUtils.htmlEscape(decodeHtmlEntities(e.getMessage())));
    }

  }

  public String decodeHtmlEntities(String input) {
    return input.replace("&lt;", "<")
        .replace("&gt;", ">")
        .replace("&amp;", "&")
        .replace("&quot;", "\"")
        .replace("&#39;", "'");
  }
}
