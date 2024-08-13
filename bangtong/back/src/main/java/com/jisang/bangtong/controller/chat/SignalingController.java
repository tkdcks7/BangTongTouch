package com.jisang.bangtong.controller.chat;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class SignalingController {

  private final Map<String, String> chatRoomToVideoRoom = new ConcurrentHashMap<>();

  @MessageMapping("/create/video-room")
  @SendTo("/topic/video-room/created")
  public String createVideoRoom(@Payload String chatRoomId) {
    String videoRoomId = generateUniqueKey();
    chatRoomToVideoRoom.put(chatRoomId, videoRoomId);
    log.info("Created video room {} for chat room {}", videoRoomId, chatRoomId);
    return videoRoomId;
  }

  @MessageMapping("/join/video-room")
  @SendTo("/topic/video-room/joined")
  public String joinVideoRoom(@Payload String chatRoomId) {
    String videoRoomId = chatRoomToVideoRoom.get(chatRoomId);
    if (videoRoomId == null) {
      videoRoomId = createVideoRoom(chatRoomId);
    }
    log.info("Joined video room {} for chat room {}", videoRoomId, chatRoomId);
    return videoRoomId;
  }

  @MessageMapping("/peer/offer/{camKey}/{roomId}")
  @SendTo("/topic/peer/offer/{camKey}/{roomId}")
  public String peerHandleOffer(@Payload String offer, @DestinationVariable String roomId,
      @DestinationVariable String camKey) {
    log.info("peer handle offer {}", offer);
    return offer;
  }

  @MessageMapping("/peer/answer/{camKey}/{roomId}")
  @SendTo("/topic/peer/answer/{camKey}/{roomId}")
  public String peerHandleAnswer(@Payload String answer, @DestinationVariable String roomId,
      @DestinationVariable String camKey) {
    log.info("peer handle answer {}", answer);
    return answer;
  }

  @MessageMapping("/peer/iceCandidate/{camKey}/{roomId}")
  @SendTo("/topic/peer/iceCandidate/{camKey}/{roomId}")
  public String peerHandleIceCandidate(@Payload String candidate,
      @DestinationVariable String roomId, @DestinationVariable String camKey) {
    log.info("peer handle iceCandidate {}", candidate);
    return candidate;
  }

  @MessageMapping("/send/key")
  @SendTo("/topic/call/key")
  public String sendKey(@Payload String message) {
    log.info("send key {}", message);
    return message;
  }

  private String generateUniqueKey() {
    return UUID.randomUUID().toString().replace("-", "").substring(0, 16);
  }

}