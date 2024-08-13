package com.jisang.bangtong.controller.chat;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// VideoRoomController.java
@RestController
@RequestMapping("/videos")
public class VideoRoomController {

  private final Map<String, String> chatRoomToVideoRoom = new ConcurrentHashMap<>();

  @PostMapping("/create")
  public ResponseEntity<String> createVideoRoom(@RequestParam String chatRoomId) {
    String videoRoomId = UUID.randomUUID().toString();
    chatRoomToVideoRoom.put(chatRoomId, videoRoomId);
    return ResponseEntity.ok(videoRoomId);
  }

  @GetMapping("/join")
  public ResponseEntity<String> joinVideoRoom(@RequestParam String chatRoomId) {
    String videoRoomId = chatRoomToVideoRoom.get(chatRoomId);
    if (videoRoomId != null) {
      return ResponseEntity.ok(videoRoomId);
    } else {
      return ResponseEntity.notFound().build();
    }
  }
  
}