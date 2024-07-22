package com.jisang.bangtong.service.user;

import com.jisang.bangtong.dto.user.LoginRequestDTO;
import com.jisang.bangtong.model.common.SecurityConstants;
import com.jisang.bangtong.model.user.User;
import com.jisang.bangtong.repository.user.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;
import javax.crypto.SecretKey;
import lombok.AllArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class UserService {

  private UserRepository userRepository;
  private final AuthenticationManager authenticationManager;
  private final Environment env;

  public void register(User user) {
    userRepository.save(user);
  }

  public void delete(Long userId) {
    userRepository.deleteById(userId);
  }

  @Transactional
  public String login(LoginRequestDTO loginRequest) {
    String token = "";

    Authentication authentication = UsernamePasswordAuthenticationToken.unauthenticated(
        loginRequest.username(), loginRequest.password());
    Authentication authenticationResponse = authenticationManager.authenticate(authentication);

    if (authenticationResponse != null && authenticationResponse.isAuthenticated()) {
      if (env != null) {
        String email = authenticationResponse.getName();
        User user = userRepository.findByUserEmail(email).get();
        token = user.getUserActiveToken();

        if (token == null) {
          String secret = env.getProperty(SecurityConstants.JWT_SECRET_KEY,
              SecurityConstants.JWT_SECRET_DEFAULT_VALUE);
          SecretKey secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));

          token = Jwts.builder().issuer("bangtong").subject("JWT Token")
              .claim("username", authenticationResponse.getName()).claim("authorities",
                  authenticationResponse.getAuthorities().stream()
                      .map(GrantedAuthority::getAuthority).collect(Collectors.joining(",")))
              .issuedAt(new java.util.Date())
              .expiration(new java.util.Date((new java.util.Date()).getTime() + 30000000))
              .signWith(secretKey).compact();

          user.setUserActiveToken(token);
          userRepository.save(user);
        }
      }
    }

    return token;
  }
}
