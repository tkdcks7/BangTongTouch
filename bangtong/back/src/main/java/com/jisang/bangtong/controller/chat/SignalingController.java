package com.jisang.bangtong.controller.chat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
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
  private final Map<String, Set<String>> videoRoomParticipants = new ConcurrentHashMap<>();

  @MessageMapping("/join/video-room")
  @SendTo("/topic/video-room/joined")
  public synchronized Map<String, String> joinVideoRoom(@Payload String chatRoomId) {
    String videoRoomId = chatRoomToVideoRoom.computeIfAbsent(chatRoomId, k -> generateUniqueKey());

    Set<String> participants = videoRoomParticipants.computeIfAbsent(videoRoomId,
        k -> new HashSet<>());
    boolean isInitiator = participants.isEmpty();
    participants.add(chatRoomId);

    log.info("Joined video room {} for chat room {}. Initiator: {}", videoRoomId, chatRoomId,
        isInitiator);
    return Map.of("videoRoomId", videoRoomId, "isInitiator", Boolean.toString(isInitiator));
  }

  @MessageMapping("/leave/video-room")
  public void leaveVideoRoom(@Payload String payload) throws JsonProcessingException {
    Map<String, String> data = new ObjectMapper().readValue(payload,
        new TypeReference<Map<String, String>>() {
        });
    String chatRoomId = data.get("chatRoomId");
    String videoRoomId = data.get("videoRoomId");

    if (videoRoomId != null && chatRoomId != null) {
      Set<String> participants = videoRoomParticipants.get(videoRoomId);
      if (participants != null) {
        participants.remove(chatRoomId);
        if (participants.isEmpty()) {
          videoRoomParticipants.remove(videoRoomId);
          chatRoomToVideoRoom.remove(chatRoomId);
        }
      }
    }
    log.info("Left video room {} for chat room {}", videoRoomId, chatRoomId);
  }

  @MessageMapping("/peer/offer/{camKey}/{roomId}")
  @SendTo("/topic/peer/offer/{camKey}/{roomId}")
  public String peerHandleOffer(@Payload String offer, @DestinationVariable String roomId,
      @DestinationVariable String camKey) {
    log.info("Peer handle offer for room: {}, camKey: {}", roomId, camKey);
    return offer;
  }

  @MessageMapping("/peer/answer/{camKey}/{roomId}")
  @SendTo("/topic/peer/answer/{camKey}/{roomId}")
  public String peerHandleAnswer(@Payload String answer, @DestinationVariable String roomId,
      @DestinationVariable String camKey) {
    log.info("Peer handle answer for room: {}, camKey: {}", roomId, camKey);
    return answer;
  }

  @MessageMapping("/peer/iceCandidate/{camKey}/{roomId}")
  @SendTo("/topic/peer/iceCandidate/{camKey}/{roomId}")
  public String peerHandleIceCandidate(@Payload String candidate,
      @DestinationVariable String roomId, @DestinationVariable String camKey) {
    log.info("Peer handle ICE candidate for room: {}, camKey: {}", roomId, camKey);
    return candidate;
  }

  @MessageMapping("/send/key")
  @SendTo("/topic/call/key")
  public String sendKey(@Payload String message) {
    log.info("Send key: {}", message);
    return message;
  }

  private String generateUniqueKey() {
    return UUID.randomUUID().toString().replace("-", "").substring(0, 16);
  }

}