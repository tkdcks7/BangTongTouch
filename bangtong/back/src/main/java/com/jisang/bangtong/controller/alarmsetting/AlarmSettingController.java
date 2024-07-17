package com.jisang.bangtong.controller.alarmsetting;


import com.jisang.bangtong.dto.alarmsetting.AlarmSettingDto;
import com.jisang.bangtong.model.alarmSetting.AlarmSetting;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/alarms")
@RequiredArgsConstructor
public class AlarmSettingController {
    @Autowired
    private final AlarmSetting alarmSetting;

    @PutMapping("/setting/modify/{userId}")
    public void updatealarmsetting(@PathVariable("userId") Long userId, @RequestBody AlarmSettingDto settingDto) {
        alarmSetting.updatealarmsetting(userId, settingDto);
    }
}
