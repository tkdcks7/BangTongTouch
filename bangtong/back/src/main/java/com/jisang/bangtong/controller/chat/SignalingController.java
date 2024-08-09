package com.jisang.bangtong.controller.chat;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SignalingController {

  @MessageMapping("/peer/offer/{camKey}/{roomId}")
  @SendTo("/topic/peer/offer/{camKey}/{roomId}")
  public String PeerHandleOffer(@Payload String offer,
      @DestinationVariable(value = "roomId") String roomId,
      @DestinationVariable(value = "camKey") String camKey) {
    return offer;
  }

  @MessageMapping("/peer/iceCandidate/{camKey}/{roomId}")
  @SendTo("/topic/peer/iceCandidate/{camKey}/{roomId}")
  public String PeerHandleIceCandidate(@Payload String answer,
      @DestinationVariable(value = "roomId") String roomId,
      @DestinationVariable(value = "camKey") String camKey) {
    return answer;
  }

  @MessageMapping("/call/key")
  @SendTo("/topic/call/key")
  public String callKey(@Payload String message) {
    return message;
  }

  @MessageMapping("/send/key")
  @SendTo("/topic/send/key")
  public String sendKey(@Payload String message) {
    return message;
  }

}
