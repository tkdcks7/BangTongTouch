package com.jisang.bangtong.controller.chat;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class SignalingController {

  @MessageMapping("/signal/{roomId}")
  @SendTo("/topic/signal/{roomId}")
  public String handleSignal(@Payload String message) {
    return message;
  }

  @MessageMapping("/join/{roomId}")
  @SendTo("/topic/join/{roomId}")
  public String handleJoin(@Payload String message) {
    return message;
  }

}