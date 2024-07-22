package com.jisang.bangtong.controller.alarmsetting;


import com.jisang.bangtong.dto.alarmsetting.AlarmSettingDto;
import com.jisang.bangtong.dto.common.ResponseDto;
import com.jisang.bangtong.service.alarmsetting.AlarmSettingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/alarms")
@Slf4j
public class AlarmSettingController {

  @Autowired
  private AlarmSettingService alarmSettingService;

  @GetMapping("/test")
  public void gettest() {
    log.info("asklml");
  }

  @PutMapping("/setting/modify/{userId}")
  public ResponseDto<Void> updatealarmsetting(@PathVariable("userId") Long userId,
      @RequestBody AlarmSettingDto settingDto) {
    alarmSettingService.updateAlarmSetting(userId, settingDto);
    return ResponseDto.res("SUCCESS");
  }
}
