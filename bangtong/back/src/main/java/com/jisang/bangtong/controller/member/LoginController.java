package com.jisang.bangtong.controller.member;

import com.jisang.bangtong.model.member.Member;
import com.jisang.bangtong.repository.member.MemberRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

  @Autowired
  private MemberRepository memberRepository;
  @Autowired
  private PasswordEncoder passwordEncoder;

  @PostMapping("/register")
  public ResponseEntity<String> registerUser(@ModelAttribute Member member) {
    Member savedMember = null;
    ResponseEntity response = null;

    try {
      String hashPwd = passwordEncoder.encode(member.getPassword());
      member.setPassword(hashPwd);
      savedMember = memberRepository.save(member);
      if (savedMember.getId() > 0) {
        response = ResponseEntity
            .status(HttpStatus.CREATED)
            .body("Given user details are successfully registered");
      }
    } catch (Exception ex) {
      response = ResponseEntity
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("An exception occured due to " + ex.getMessage());
    }
    return response;
  }

  @RequestMapping("/users")
  public Member getUserDetailsAfterLogin(Authentication authentication) {
    List<Member> members = memberRepository.findByEmail(authentication.getName());
    if (!members.isEmpty()) {
      return members.get(0);
    } else {
      return null;
    }

  }

}
