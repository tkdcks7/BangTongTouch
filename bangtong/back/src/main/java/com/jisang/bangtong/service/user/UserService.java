package com.jisang.bangtong.service.user;

import com.jisang.bangtong.constants.SecurityConstants;
import com.jisang.bangtong.dto.user.LoginRequestDTO;
import com.jisang.bangtong.model.user.User;
import com.jisang.bangtong.repository.user.UserRepository;
import com.jisang.bangtong.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Slf4j
public class UserService {

  private UserRepository userRepository;
  private final AuthenticationManager authenticationManager;
  private JwtUtil jwtUtil;

  public void register(User user) {
    userRepository.save(user);
  }

  public void delete(Long userId) {
    userRepository.deleteById(userId);
  }

  @Transactional
  public Map<String, String> login(LoginRequestDTO loginRequest) {
    Authentication authentication = UsernamePasswordAuthenticationToken.unauthenticated(
        loginRequest.username(), loginRequest.password());
    Authentication authenticationResponse = authenticationManager.authenticate(authentication);

    Map<String, String> tokens = new HashMap<>();
    Date currentDate = new Date();

    if (authenticationResponse != null && authenticationResponse.isAuthenticated()) {
      String email = authenticationResponse.getName();
      User user = userRepository.findByUserEmail(email).orElse(null);

      tokens.put("accessToken",
          jwtUtil.generateAccessToken(user, authenticationResponse, currentDate));
      tokens.put("refreshToken",
          jwtUtil.generateRefreshToken(user, authenticationResponse, currentDate));
    }

    return tokens;
  }

  public void logout(HttpServletRequest request, HttpServletResponse response) {
    String header = request.getHeader(SecurityConstants.JWT_HEADER);
  }

  public User getUser(Long userId) {
    return null;
  }

}