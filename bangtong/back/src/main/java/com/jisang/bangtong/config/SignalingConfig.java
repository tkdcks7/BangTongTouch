package com.jisang.bangtong.config;

import com.jisang.bangtong.handler.SignalingHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class SignalingConfig implements WebSocketConfigurer {

  private final SignalingHandler signalingHandler;

  @Override
  public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
    registry.addHandler(signalingHandler, "/signaling").setAllowedOrigins("*");
  }

}