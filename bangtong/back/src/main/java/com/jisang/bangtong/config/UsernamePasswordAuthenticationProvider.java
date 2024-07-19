package com.jisang.bangtong.config;

import com.jisang.bangtong.model.user.User;
import com.jisang.bangtong.repository.user.UserRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UsernamePasswordAuthenticationProvider implements AuthenticationProvider {

  @Autowired
  private UserRepository userRepository;
  @Autowired
  private PasswordEncoder passwordEncoder;

  @Override
  public Authentication authenticate(Authentication authentication) throws AuthenticationException {
    String username = authentication.getName();
    String password = authentication.getCredentials().toString();
    List<User> users = userRepository.findByUserEmail(username);

    if (users == null || users.isEmpty()) {
      throw new BadCredentialsException("가입된 정보가 없습니다.");
    } else {
      User user = users.get(0);

      if (passwordEncoder.matches(password, user.getUserPassword())) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(
            new SimpleGrantedAuthority(user.isUserIsAdmin() ? "admin" : "user"));

        return new UsernamePasswordAuthenticationToken(username, password, authorities);
      } else {
        throw new BadCredentialsException("비밀번호가 일치하지 않습니다.");
      }
    }
  }

  @Override
  public boolean supports(Class<?> authentication) {
    return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
  }

}
