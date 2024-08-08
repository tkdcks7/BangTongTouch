package com.jisang.bangtong.service.email;

import com.jisang.bangtong.dto.email.EmailDto;
import com.jisang.bangtong.model.email.Code;
import com.jisang.bangtong.repository.email.CodeRepository;
import java.util.Optional;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CodeService {

  private final CodeRepository codeRepository;

  private String createCode() {
    Random random = new Random();
    int code = random.nextInt(1000000);

    return String.format("%06d", code);
  }

  public String saveCode(String email) {
    String code = createCode();
    codeRepository.save(new Code(email, code));

    return code;
  }

  public boolean verifyCode(String email, String receivedCode) {
    Optional<Code> code = codeRepository.findById(email);
    String savedCode = code.map(Code::getCode).orElse(null);

    if (savedCode == null) {
      return false;
    }

    return savedCode.equals(receivedCode);
  }

}