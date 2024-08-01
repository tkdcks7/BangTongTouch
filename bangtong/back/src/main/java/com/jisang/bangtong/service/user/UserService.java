package com.jisang.bangtong.service.user;

import com.jisang.bangtong.constants.ResponseMessageConstants;
import com.jisang.bangtong.constants.SecurityConstants;
import com.jisang.bangtong.dto.user.LoginRequestDto;
import com.jisang.bangtong.dto.user.RegisterRequestDto;
import com.jisang.bangtong.dto.user.UserDto;
import com.jisang.bangtong.model.user.User;
import com.jisang.bangtong.repository.user.UserRepository;
import com.jisang.bangtong.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Slf4j
public class UserService {

  private UserRepository userRepository;
  private final AuthenticationManager authenticationManager;
  private JwtUtil jwtUtil;
  private PasswordEncoder passwordEncoder;

  public void register(RegisterRequestDto registerRequestDto) {
    String password = passwordEncoder.encode(registerRequestDto.password());

    User user = new User();
    user.setUserEmail(registerRequestDto.email());
    user.setUserPassword(password);
    user.setUserBirthYear(registerRequestDto.birthYear());
    user.setUserNickname(registerRequestDto.nickname());

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
  public Map<String, Object> login(LoginRequestDto loginRequest) {
    Authentication authentication = UsernamePasswordAuthenticationToken.unauthenticated(
        loginRequest.username(), loginRequest.password());
    Authentication authenticationResponse = authenticationManager.authenticate(authentication);

    Map<String, Object> map = new HashMap<>();
    String accessToken = "";
    UserDto userDto = new UserDto();
    Date currentDate = new Date();

    if (authenticationResponse != null && authenticationResponse.isAuthenticated()) {
      String email = authenticationResponse.getName();

      User user = userRepository.findByUserEmail(email).orElse(null);

      userDto.setId(Objects.requireNonNull(user).getUserId());
      userDto.setNickname(user.getUserNickname());

      String authorities = authenticationResponse.getAuthorities().stream()
          .map(GrantedAuthority::getAuthority)
          .collect(Collectors.joining(","));

      accessToken = jwtUtil.generateAccessToken(user, authorities, currentDate);
      String refreshToken = jwtUtil.generateRefreshToken(user, authorities, currentDate);
      user.setUserRefreshToken(refreshToken);

      userRepository.saveAndFlush(user);
    }

    map.put("accessToken", accessToken);
    map.put("user", userDto);

    return map;
  }

  public void logout(HttpServletRequest request, HttpServletResponse response) {
    String header = request.getHeader(SecurityConstants.JWT_HEADER);
  }

  public User getUser(Long userId) {
    return userRepository.findById(userId).orElse(new User());
  }

}