package com.jisang.bangtong.controller.chat;

import java.util.UUID;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SignalingController {

  @MessageMapping("/peer/offer/{camKey}/{roomId}")
  @SendTo("/topic/peer/offer/{camKey}/{roomId}")
  public String peerHandleOffer(@Payload String offer, @DestinationVariable String roomId,
      @DestinationVariable String camKey) {
    return offer;
  }

  @MessageMapping("/peer/answer/{camKey}/{roomId}")
  @SendTo("/topic/peer/answer/{camKey}/{roomId}")
  public String peerHandleAnswer(@Payload String answer, @DestinationVariable String roomId,
      @DestinationVariable String camKey) {
    return answer;
  }

  @MessageMapping("/peer/iceCandidate/{camKey}/{roomId}")
  @SendTo("/topic/peer/iceCandidate/{camKey}/{roomId}")
  public String peerHandleIceCandidate(@Payload String candidate,
      @DestinationVariable String roomId, @DestinationVariable String camKey) {
    return candidate;
  }

  @MessageMapping("/send/key")
  @SendTo("/topic/call/key")
  public String sendKey(@Payload String message) {
    return generateUniqueKey();
  }

  private String generateUniqueKey() {
    return UUID.randomUUID().toString().replace("-", "").substring(0, 16);
  }

}