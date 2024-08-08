package com.jisang.bangtong.service.email;

import com.jisang.bangtong.dto.email.EmailDto;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

  private final CodeService codeService;
  private final JavaMailSender javaMailSender;

  public void sendCode(String email) {
    log.info("send email code");

    String code = codeService.saveCode(email);

    log.info("send email code done");

    MimeMessage mimeMessage = createMimeMessage(email, code);

    log.info("mimeMessage: {}", mimeMessage);

    javaMailSender.send(mimeMessage);

    log.info("send complete");
  }

  public boolean verifyCode(EmailDto emailDto) {
    if (emailDto.getEmail() == null || emailDto.getEmail().isEmpty()) {
      return false;
    }

    return codeService.verifyCode(emailDto.getEmail(), emailDto.getCode());
  }

  private MimeMessage createMimeMessage(String email, String code) {
    MimeMessage mimeMessage = javaMailSender.createMimeMessage();

    try {
      MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
      mimeMessageHelper.setFrom("noreply.bangtong@gmail.com");
      mimeMessageHelper.setTo(email);
      mimeMessageHelper.setSubject("[방통터치] 이메일 인증 안내");

      StringBuilder body = new StringBuilder();
      body.append("<!DOCTYPE html><html lang=\"ko\"><head><meta charset=\"UTF-8\">")
          .append("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">")
          .append("<title>이메일 인증</title><style>").append(
              "body{font-family:'Apple SD Gothic Neo','Malgun Gothic','맑은 고딕',sans-serif;line-height:1.6;color:#333;max-width:600px;margin:0 auto;padding:20px}")
          .append(
              ".container{background-color:#fff;border-radius:8px;padding:30px;box-shadow:0 4px 6px rgba(0,0,0,0.1)}")
          .append("h1{color:#4a4a4a;font-size:24px;margin-bottom:20px}").append(
              ".verification-code{background-color:#f0f0f0;font-size:28px;font-weight:bold;text-align:center;padding:15px;margin:20px 0;border-radius:4px}")
          .append(".footer{font-size:12px;color:#888;margin-top:30px;text-align:center}")
          .append("</style></head><body><div class=\"container\">").append("<h1>이메일 인증 코드</h1>")
          .append("<p>안녕하세요,</p>").append("<p>귀하의 계정 인증을 위한 6자리 코드입니다. 아래 코드를 입력해 주세요:</p>")
          .append("<div class=\"verification-code\">").append(code).append("</div>")
          .append("코드는 5분간 유효합니다. 본인이 요청하지 않은 경우 이 이메일을 무시하셔도 됩니다.</p>").append("<p>감사합니다.</p>")
          .append("<div class=\"footer\">본 이메일은 발신 전용이며 회신되지 않습니다.</div>")
          .append("</div></body></html>");

      mimeMessageHelper.setText(body.toString(), true);
    } catch (MessagingException e) {
      log.error(e.getMessage());
    }

    return mimeMessage;
  }

}