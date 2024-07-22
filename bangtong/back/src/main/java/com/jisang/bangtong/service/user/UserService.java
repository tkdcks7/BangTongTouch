package com.jisang.bangtong.service.user;

import com.jisang.bangtong.model.user.User;
import com.jisang.bangtong.repository.user.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  public void register(User user) {
    userRepository.save(user);
  }

  public void delete(Long userId) {
    userRepository.deleteById(userId);
  }

  public List<User> findByEmail(String email) {
    return userRepository.findByUserEmail(email);
  }
}
