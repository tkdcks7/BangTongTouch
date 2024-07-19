package com.jisang.bangtong.service.user;

import com.jisang.bangtong.model.user.User;
import com.jisang.bangtong.repository.user.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  public User register(User user) {
    return userRepository.save(user);
  }

  public void delete(Long userId) {
    userRepository.deleteById(userId);
  }

  public List<User> getUserDetailsAfterLogin(Authentication authentication) {
    return userRepository.findByUserEmail(authentication.getName());
  }
}
