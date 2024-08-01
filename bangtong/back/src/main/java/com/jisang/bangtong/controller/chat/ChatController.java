package com.jisang.bangtong.controller.chat;

import com.jisang.bangtong.dto.common.ResponseDto;
import com.jisang.bangtong.model.chat.Chat;
import com.jisang.bangtong.service.chat.ChatService;
import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/chats")
@Slf4j
public class ChatController {

  private final String SUCCESS = "success";
  private final ChatService chatService;

  @Autowired
  public ChatController(ChatService chatService) {
    this.chatService = chatService;
  }

  @PostMapping("/save")
  public ResponseDto<Void> sendMessage(@RequestBody Map<String, Object> chat, @RequestPart List<MultipartFile> chatMedia) {
    chatService.send(chat, chatMedia);
    return ResponseDto.res(SUCCESS);
  }

  @GetMapping("/room/{chatroomId}")
  public ResponseDto<List<Chat>> getChats(@PathVariable("chatroomId") Long chatroomId) {
    List<Chat> chats = chatService.getMessagesByRoom(chatroomId);
    return ResponseDto.res(SUCCESS, chats);
  }
}