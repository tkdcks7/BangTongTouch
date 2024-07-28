package com.jisang.bangtong.controller.chatroom;

import com.jisang.bangtong.dto.chat.ChatReturnDto;
import com.jisang.bangtong.dto.chatroom.ChatroomDto;
import com.jisang.bangtong.dto.chatroom.ChatroomExitDto;
import com.jisang.bangtong.dto.chatroom.ChatroomReturnDto;
import com.jisang.bangtong.dto.common.ResponseDto;
import com.jisang.bangtong.model.chatroom.Chatroom;
import com.jisang.bangtong.service.chatroom.ChatroomService;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/chatrooms")
public class ChatroomController {
  private final String SUCCESS = "success";
  private final String SERVER_ERROR = "server_error";
  private final String CLIENT_ERROR = "client_error";
  @Autowired
  private ChatroomService chatroomService;

  @PostMapping("/save")
  public ResponseDto<Void> save(@RequestBody ChatroomDto chatroomDto) {
    log.info("{}", chatroomDto);
    chatroomService.createChatroom(chatroomDto);
    return ResponseDto.res(SUCCESS);
  }

  @PutMapping("/end/{chattoomId}/{userId}")
  public ResponseDto<Void> end(@PathVariable Long chattoomId, @PathVariable Long userId) {
    chatroomService.exitChatroom(chattoomId, userId);
    return ResponseDto.res(SUCCESS);
  }

  @GetMapping("/{userId}")
  public ResponseDto<List<ChatroomReturnDto>> getrooms(@PathVariable Long userId) {
    log.info("{}", userId);
    List<ChatroomReturnDto>chatroomReturnDtoList = chatroomService.getChatroom(userId);
    log.info("List 출력 {}", chatroomReturnDtoList);
    return ResponseDto.res(SUCCESS, chatroomReturnDtoList);
  }

  @GetMapping("/chat/{chatroomId}")
  public ResponseDto<List<ChatReturnDto>> getChats(@PathVariable Long chatroomId){
    log.info("{}", chatroomId);
    List<ChatReturnDto> chatReturnDtoList =  chatroomService.getChats(chatroomId);
    log.info("getChats: {}", chatReturnDtoList);
    return ResponseDto.res(SUCCESS, chatReturnDtoList);
  }
}
