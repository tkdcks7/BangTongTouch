package com.jisang.bangtong.controller.interest;

import com.jisang.bangtong.dto.Interest.InterestDto;
import com.jisang.bangtong.dto.common.ResponseDto;
import com.jisang.bangtong.model.interest.Interest;
import com.jisang.bangtong.service.interest.InterestService;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/interests")
@Slf4j
public class InterestController {
  static final String SUCCESS="success";

  @Autowired
  private InterestService interestService;

  @PostMapping("/add")
  public ResponseDto<Void> add(@RequestBody InterestDto interestDto) {

    log.info("interest: {}", interestDto);
    interestService.add(interestDto);
    return ResponseDto.res(SUCCESS);
  }



}
