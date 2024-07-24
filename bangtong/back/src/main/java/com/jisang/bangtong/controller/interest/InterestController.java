package com.jisang.bangtong.controller.interest;

import com.jisang.bangtong.dto.Interest.InterestDto;
import com.jisang.bangtong.dto.common.ResponseDto;
import com.jisang.bangtong.model.interest.Interest;
import com.jisang.bangtong.service.interest.InterestService;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

  @DeleteMapping("/delete/{userId}/{productId}")
  public ResponseDto<Void> delete(@PathVariable("userId") String userId, @PathVariable("productId") String productId) {
    log.info("Interests delete 실행");
    InterestDto interestDto = new InterestDto();
    interestDto.setProductId(Long.parseLong(productId));
    interestDto.setUserId(Long.parseLong(userId));
    interestService.delete(interestDto);
    return ResponseDto.res(SUCCESS);
  }

  @GetMapping("/{userId}")
  public ResponseDto<List<Interest>> getList(@PathVariable Long userId){
    log.info("찜 목록 가져오는 쿼리 실행");
    Optional<List<Interest>> optionalInterestList = interestService.getList(userId);
    List<Interest> interestList;
    if (optionalInterestList.isPresent()){
      interestList = optionalInterestList.get();
      return ResponseDto.res(SUCCESS,interestList);
    }
    else{
      log.info("찜 목록이 없습니다");
      return ResponseDto.res(SUCCESS);
    }


  }


}
