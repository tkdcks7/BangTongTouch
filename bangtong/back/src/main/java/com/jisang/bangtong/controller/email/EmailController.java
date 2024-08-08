package com.jisang.bangtong.controller.email;

import com.jisang.bangtong.constants.ResponseMessageConstants;
import com.jisang.bangtong.dto.common.ResponseDto;
import com.jisang.bangtong.dto.email.EmailDto;
import com.jisang.bangtong.service.email.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/emails")
@RequiredArgsConstructor
@Slf4j
public class EmailController {

  private final EmailService emailService;

  @PostMapping
  public ResponseDto<Void> sendCode(@RequestBody EmailDto emailDto) {
    try {
      emailService.sendCode(emailDto.getEmail());
      return ResponseDto.res(ResponseMessageConstants.SUCCESS);
    } catch (Exception e) {
      log.error(e.getMessage());
      return ResponseDto.res(ResponseMessageConstants.SERVER_ERROR);
    }
  }

  @PostMapping("/verify")
  public ResponseDto<Boolean> verifyCode(@RequestBody EmailDto emailDto) {
    boolean result = emailService.verifyCode(emailDto);
    return ResponseDto.res(ResponseMessageConstants.SUCCESS, result);
  }

}