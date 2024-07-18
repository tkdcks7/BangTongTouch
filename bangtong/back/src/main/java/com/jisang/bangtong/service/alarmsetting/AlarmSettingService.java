package com.jisang.bangtong.service.alarmsetting;

import com.jisang.bangtong.dto.alarmsetting.AlarmSettingDto;
import com.jisang.bangtong.model.alarmSetting.AlarmSetting;
import com.jisang.bangtong.repository.alarmsetting.AlarmSettingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AlarmSettingService {

    @Autowired
    private AlarmSettingRepository alarmSettingRepository;

    public void updateAlarmSetting(Long userId, AlarmSettingDto alarmSettingDto) {
        Optional<AlarmSetting> optionalAlarmSetting = alarmSettingRepository.findByUserId(userId);
        AlarmSetting setting = optionalAlarmSetting.orElseGet(() -> {
            AlarmSetting newSetting = new AlarmSetting();
            newSetting.setAlarmId(userId);
            return newSetting;
        });

        setting.setAlarmPhoneChat(alarmSettingDto.getAlarmPhoneChat());
        setting.setAlarmPhoneComplete(alarmSettingDto.getAlarmPhoneComplete());
        setting.setAlarmEmailInterest(alarmSettingDto.getAlarmPhoneInterest());
        setting.setAlarmEmailChat(alarmSettingDto.getAlarmEmailChat());
//        setting.setAlarmEmailComplete(alarmSettingDto.ge);
        alarmSettingRepository.save(setting);
    }

}
