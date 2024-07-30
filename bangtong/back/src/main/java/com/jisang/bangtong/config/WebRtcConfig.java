package com.jisang.bangtong.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.graphql.servlet.GraphQlWebMvcAutoConfiguration.WebSocketConfiguration;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class WebRtcConfig extends WebSocketConfiguration {

}
