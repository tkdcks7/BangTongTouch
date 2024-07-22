package com.jisang.bangtong.controller.region;

import com.jisang.bangtong.dto.common.ResponseDto;
import com.jisang.bangtong.dto.region.RegionDongDto;
import com.jisang.bangtong.dto.region.RegionGugunDto;
import com.jisang.bangtong.dto.region.RegionSidoDto;
import com.jisang.bangtong.model.region.Region;
import com.jisang.bangtong.service.region.RegionService;

import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/regions")
@Slf4j
public class RegionController {

  private final String SUCCESS = "success";
  private final String SERVER_ERROR = "server_error";
  private final String CLIENT_ERROR = "client_error";

  @Autowired
  private RegionService regionService;

  @GetMapping("/")
  public ResponseEntity<ResponseDto<List<RegionSidoDto>>> searchSido(){
    log.info("/regions/ 호출");
    List<RegionSidoDto> regions = regionService.searchSido();

    if(regions == null){
      return ResponseEntity.ok(ResponseDto.res(CLIENT_ERROR));
    }else{
      return ResponseEntity.ok(ResponseDto.res(SUCCESS, regions));
    }
  }

  @GetMapping("/{sido}")
  public ResponseEntity<ResponseDto<List<RegionGugunDto>>> searchGugun(@PathVariable String sido) {
    log.info("/regions/ 호출");
    List<RegionGugunDto> regions = regionService.searchGugun(sido);

    if (regions == null) {
      return ResponseEntity.ok(ResponseDto.res(CLIENT_ERROR));
    } else {
      return ResponseEntity.ok(ResponseDto.res(SUCCESS, regions));
    }
  }

  @GetMapping("/gugun/{gugun}")
  public ResponseEntity<ResponseDto<List<RegionDongDto>>> searchSido(@PathVariable String gugun) {
    log.info("/regions/gugun 호출");
    List<RegionDongDto> regions = regionService.searchDong(gugun);
    if(regions==null){
      return ResponseEntity.ok(ResponseDto.res(CLIENT_ERROR));
    }else{
      return ResponseEntity.ok(ResponseDto.res(SUCCESS, regions));
    }
  }

}
