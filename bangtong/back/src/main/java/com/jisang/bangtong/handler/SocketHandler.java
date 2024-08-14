package com.jisang.bangtong.handler;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class SocketHandler extends TextWebSocketHandler {

  Map<String, WebSocketSession> rooms = new ConcurrentHashMap<>();

  @Override
  public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
    String payload = message.getPayload();
    if (payload.startsWith("join_room:")) {
      String roomName = payload.split(":")[1];
      rooms.put(roomName, session);
      session.sendMessage(new TextMessage("welcome"));
    } else if (payload.startsWith("offer:")) {
      String[] parts = payload.split(":", 3);
      String roomName = parts[1];
      String offer = parts[2];
      WebSocketSession peerSession = rooms.get(roomName);
      if (peerSession != null) {
        peerSession.sendMessage(new TextMessage("offer:" + offer));
      }
    } else if (payload.startsWith("answer:")) {
      String[] parts = payload.split(":", 3);
      String roomName = parts[1];
      String answer = parts[2];
      WebSocketSession peerSession = rooms.get(roomName);
      if (peerSession != null) {
        peerSession.sendMessage(new TextMessage("answer:" + answer));
      }
    } else if (payload.startsWith("ice:")) {
      String[] parts = payload.split(":", 3);
      String roomName = parts[1];
      String ice = parts[2];
      WebSocketSession peerSession = rooms.get(roomName);
      if (peerSession != null) {
        peerSession.sendMessage(new TextMessage("ice:" + ice));
      }
    }
  }
  
}