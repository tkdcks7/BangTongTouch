package com.jisang.bangtong.config;

import com.jisang.bangtong.model.common.Authority;
import com.jisang.bangtong.model.member.Member;
import com.jisang.bangtong.repository.member.MemberRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
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
  private MemberRepository memberRepository;
  @Autowired
  private PasswordEncoder passwordEncoder;

  @Override
  public Authentication authenticate(Authentication authentication) throws AuthenticationException {
    String username = authentication.getName();
    String password = authentication.getCredentials().toString();
    List<Member> members = memberRepository.findByEmail(username);

    if (!members.isEmpty()) {
      if (passwordEncoder.matches(password, members.get(0).getPassword())) {
        return new UsernamePasswordAuthenticationToken(username, password,
            getGrantedAuthorities(members.get(0).getAuthorities()));
      } else {
        throw new BadCredentialsException("유효하지 않은 비밀번호입니다.");
      }
    } else {
      throw new BadCredentialsException("이 정보로 가입된 회원 정보가 없습니다.");
    }
  }

  private List<GrantedAuthority> getGrantedAuthorities(Set<Authority> authorities) {
    List<GrantedAuthority> grantedAuthorities = new ArrayList<>();

    for (Authority authority : authorities) {
      grantedAuthorities.add(new SimpleGrantedAuthority(authority.getName()));
    }

    return grantedAuthorities;
  }

  @Override
  public boolean supports(Class<?> authentication) {
    return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
  }

}