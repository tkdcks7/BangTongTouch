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
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Slf4j
public class UserService {

  private UserRepository userRepository;
  private final AuthenticationManager authenticationManager;

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
      String email = authenticationResponse.getName();
      User user = userRepository.findByUserEmail(email).orElse(null);

    }

    return token;
  }
}
