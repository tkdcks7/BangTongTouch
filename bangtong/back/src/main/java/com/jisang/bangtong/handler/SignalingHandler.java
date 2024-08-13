package com.jisang.bangtong.handler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class SignalingHandler extends TextWebSocketHandler {

  private static final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

  @Override
  public void afterConnectionEstablished(WebSocketSession session) throws Exception {
    String sessionId = session.getId();
    sessions.put(sessionId, session);
  }

  @Override
  protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    String payload = message.getPayload();
    JsonNode jsonNode = new ObjectMapper().readTree(payload);
    String type = jsonNode.get("type").asText();
    String target = jsonNode.get("target").asText();

    WebSocketSession targetSession = sessions.get(target);
    if (targetSession != null && targetSession.isOpen()) {
      targetSession.sendMessage(message);
    }
  }

  @Override
  public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
    sessions.remove(session.getId());
  }

}