package com.jisang.bangtong.controller.alarmsetting;


import com.jisang.bangtong.dto.alarmsetting.AlarmSettingDto;
import com.jisang.bangtong.dto.common.ResponseDto;
import com.jisang.bangtong.model.alarmSetting.AlarmSetting;
import com.jisang.bangtong.service.alarmsetting.AlarmSettingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.juli.logging.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/alarms")
@RequiredArgsConstructor
@Slf4j
public class AlarmSettingController {
    @Autowired
    private AlarmSettingService alarmSettingService;

    @GetMapping("/test")
    public void gettest(){
        log.info("asklml");
    }

    @PostMapping("/setting/modify/{userId}")
    public ResponseEntity<ResponseDto<Void>> updatealarmsetting(@PathVariable("userId") Long userId, @RequestBody AlarmSettingDto settingDto) {
        userId = 1L;
        System.out.println("업데이트");
        alarmSettingService.updateAlarmSetting(userId, settingDto);
        return ResponseEntity.ok(ResponseDto.res("SUCCESS"));
    }
}
