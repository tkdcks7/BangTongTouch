package com.jisang.bangtong.config;

import static org.springframework.security.config.Customizer.withDefaults;

import com.jisang.bangtong.exceptionhandling.BasicAuthenticationEntryPoint;
import com.jisang.bangtong.exceptionhandling.CustomAccessDeniedHandler;
import com.jisang.bangtong.filter.CsrfCookieFilter;
import com.jisang.bangtong.filter.JWTTokenValidatorFilter;
import com.jisang.bangtong.repository.user.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.password.CompromisedPasswordChecker;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.password.HaveIBeenPwnedRestApiPasswordChecker;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

  private final UserRepository userRepository;

  @Bean
  SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
    CsrfTokenRequestAttributeHandler csrfTokenRequestAttributeHandler = new CsrfTokenRequestAttributeHandler();

    http.sessionManagement(
            sessionConfig -> sessionConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .cors(corsConfig -> corsConfig.configurationSource(request -> {
          CorsConfiguration config = new CorsConfiguration();

          config.setAllowedOriginPatterns(List.of("*"));
          config.setAllowCredentials(true);
          config.setAllowedMethods(List.of("*"));
          config.setAllowedHeaders(List.of("*"));
          config.setExposedHeaders(List.of("Authorization"));
          config.setMaxAge(3600L);

          return config;
        })).csrf(csrfConfig -> csrfConfig.csrfTokenRequestHandler(csrfTokenRequestAttributeHandler)
            .ignoringRequestMatchers(
                //    "/users/register", "/users/login"
                "/**"
            )
            .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()))
        .addFilterAfter(new CsrfCookieFilter(), BasicAuthenticationFilter.class)
        .addFilterBefore(new JWTTokenValidatorFilter(userRepository),
            BasicAuthenticationFilter.class)
//        .addFilterAfter(new JWTTokenGeneratorFilter(), JWTTokenValidatorFilter.class)
        .requiresChannel(rcc -> rcc.anyRequest().requiresInsecure())
        .authorizeHttpRequests(
            (requests) -> requests.requestMatchers("/regions/**").authenticated()
                .anyRequest().permitAll()).formLogin(withDefaults())
        .httpBasic(hbc -> hbc.authenticationEntryPoint(new BasicAuthenticationEntryPoint()))
        .exceptionHandling(ehc -> ehc.accessDeniedHandler(new CustomAccessDeniedHandler()));

    return http.build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return PasswordEncoderFactories.createDelegatingPasswordEncoder();
  }

  @Bean
  public CompromisedPasswordChecker compromisedPasswordChecker() {
    return new HaveIBeenPwnedRestApiPasswordChecker();
  }

  @Bean
  public AuthenticationManager authenticationManager(UserDetailsService userDetailsService,
      PasswordEncoder passwordEncoder) {
    UsernamePasswordAuthenticationProvider authenticationProvider = new UsernamePasswordAuthenticationProvider(
        userDetailsService, passwordEncoder);

    ProviderManager providerManager = new ProviderManager(authenticationProvider);
    providerManager.setEraseCredentialsAfterAuthentication(false);

    return providerManager;
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .authorizeHttpRequests(authorize -> authorize
            .requestMatchers("/ws/**").permitAll() // WebSocket 엔드포인트에 대한 접근을 허용
            .anyRequest().authenticated() // 다른 모든 요청은 인증 요구됨
        )
        .csrf(csrf -> csrf.disable()); // WebSocket을 사용할 때는 CSRF 보호를 비활성화해야 함.

    return http.build();
  }


}
