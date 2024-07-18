package com.jisang.bangtong.service.alarmsetting;

import com.jisang.bangtong.dto.alarmsetting.AlarmSettingDto;
import com.jisang.bangtong.model.alarmSetting.AlarmSetting;
import com.jisang.bangtong.repository.alarmsetting.AlarmSettingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AlarmSettingService {

    @Autowired
    private AlarmSettingRepository alarmSettingRepository;

    // 알림 권한 설정
    public void updateAlarmSetting(Long userId, AlarmSettingDto alarmSettingDto) {
        Optional<AlarmSetting> optionalAlarmSetting = alarmSettingRepository.findByUserId(userId);
        AlarmSetting setting = optionalAlarmSetting.orElseGet(() -> {
            AlarmSetting newSetting = new AlarmSetting();
            newSetting.setAlarmId(userId);
            return newSetting;
        });

        setting.setAlarmPhoneChat(alarmSettingDto.isAlarmPhoneChat());
        setting.setAlarmPhoneComplete(alarmSettingDto.isAlarmPhoneComplete());
        setting.setAlarmEmailInterest(alarmSettingDto.isAlarmEmailInterest());
        setting.setAlarmEmailChat(alarmSettingDto.isAlarmEmailChat());
        setting.setAlarmId(alarmSettingDto.getAlarmId());
        setting.setUserId(alarmSettingDto.getUserId());
        setting.setAlarmPhoneInterest(alarmSettingDto.isAlarmPhoneInterest());
        alarmSettingRepository.save(setting);
    }

    // 알림 권한 조회
    public List<AlarmSettingDto> alarmAuthorize(Long userId) {
        List<AlarmSettingDto> resultSettingDto = new ArrayList<>();
        List<AlarmSetting> resultSetting = alarmSettingRepository.findAll();

        for (AlarmSetting setting : resultSetting) {
            AlarmSettingDto dtos = new AlarmSettingDto();
            dtos.setAlarmId(setting.getAlarmId());
            dtos.setUserId(setting.getUserId());
            dtos.setAlarmPhoneChat(setting.isAlarmPhoneChat());
            dtos.setAlarmPhoneComplete(setting.isAlarmPhoneComplete());
            dtos.setAlarmPhoneInterest(setting.isAlarmPhoneInterest());
            dtos.setAlarmEmailInterest(setting.isAlarmEmailInterest());
            dtos.setAlarmEmailChat(setting.isAlarmEmailChat());
            resultSettingDto.add(dtos);
        }
        return resultSettingDto;

    }

}
