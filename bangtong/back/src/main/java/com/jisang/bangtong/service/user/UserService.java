package com.jisang.bangtong.service.user;

import com.jisang.bangtong.constants.ResponseMessageConstants;
import com.jisang.bangtong.constants.SecurityConstants;
import com.jisang.bangtong.dto.user.LoginRequestDTO;
import com.jisang.bangtong.model.user.User;
import com.jisang.bangtong.repository.user.UserRepository;
import com.jisang.bangtong.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Date;
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

  public String delete(Long userId) {
    User user = userRepository.findById(userId).orElse(null);

    if (user == null) {
      return ResponseMessageConstants.CLIENT_ERROR;
    } else {
      user.setUserIsDeleted(true);
      userRepository.save(user);

      return ResponseMessageConstants.SUCCESS;
    }
  }

  @Transactional
  public String login(LoginRequestDTO loginRequest) {
    Authentication authentication = UsernamePasswordAuthenticationToken.unauthenticated(
        loginRequest.username(), loginRequest.password());
    Authentication authenticationResponse = authenticationManager.authenticate(authentication);

    String accessToken = "";
    Date currentDate = new Date();

    if (authenticationResponse != null && authenticationResponse.isAuthenticated()) {
      String email = authenticationResponse.getName();
      User user = userRepository.findByUserEmail(email).orElse(null);

      accessToken = jwtUtil.generateAccessToken(user, authenticationResponse, currentDate);
      String refreshToken = jwtUtil.generateRefreshToken(user, authenticationResponse, currentDate);
    }

    log.info("accessToken: {}", accessToken);

    return accessToken;
  }

  public void logout(HttpServletRequest request, HttpServletResponse response) {
    String header = request.getHeader(SecurityConstants.JWT_HEADER);
  }

  public User getUser(Long userId) {
    return userRepository.findById(userId).orElse(new User());
  }

}