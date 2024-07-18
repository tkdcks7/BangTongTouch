package com.jisang.bangtong.controller.alarmMessage;

import com.jisang.bangtong.dto.alarmMessage.AlarmMessageDto;
import com.jisang.bangtong.dto.alarmsetting.AlarmSettingDto;
import com.jisang.bangtong.dto.common.ResponseDto;
import com.jisang.bangtong.model.alarmSetting.AlarmSetting;
import com.jisang.bangtong.service.alarmMessage.AlarmMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alarms")
@RequiredArgsConstructor
public class AlarmMessageContoller {
    @Autowired
    private AlarmMessageService alarmMessageService;

    // 알림 목록 조회
    @GetMapping("/{userId}/list")
    private ResponseEntity<ResponseDto<List<AlarmMessageDto>>> alarmList(@PathVariable long userId) {
        List<AlarmMessageDto> messageList = alarmMessageService.alarmList(userId);
        return ResponseEntity.ok(ResponseDto.res("SUCCESS", messageList));
    }


}
