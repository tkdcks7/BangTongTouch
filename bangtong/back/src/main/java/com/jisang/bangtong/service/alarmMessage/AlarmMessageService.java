package com.jisang.bangtong.service.alarmMessage;

import com.jisang.bangtong.dto.alarmMessage.AlarmMessageDto;
import com.jisang.bangtong.model.alarmMessage.AlarmMessage;
import com.jisang.bangtong.repository.alarmMessage.AlarmMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AlarmMessageService {

    @Autowired
    private AlarmMessageRepository alarmMessageRepository;

    // 알림 목록 조회
    public List<AlarmMessageDto> alarmList(long userId) {
        List<AlarmMessageDto> resultDto = new ArrayList<>();
        List<AlarmMessage> result = alarmMessageRepository.findAll();

        for (AlarmMessage alarmMessage : result) {
            AlarmMessageDto dto = new AlarmMessageDto();
            dto.setAlarmMessageId(alarmMessage.getAlarmMessageId());
            dto.setAlarmMessageDate(alarmMessage.getAlarmMessageDate());
            dto.setAlarmMessage(alarmMessage.getAlarmMessage());
            resultDto.add(dto);
        }
        return resultDto;
    }

    // 알림 삭제
    public void deleteAlarm(long alarmMessageId) {
        alarmMessageRepository.deleteById(alarmMessageId);
//        alarmMessageRepository.deleteAlarm(alarmMessageId);
    }

    // 알림 생성
    public void createAlarm(AlarmMessageDto alarmMessageDto) {
        AlarmMessage alarmMessage = new AlarmMessage();
        alarmMessage.setUserId(alarmMessageDto.getAlarmMessageId());
        alarmMessage.setAlarmMessage(alarmMessageDto.getAlarmMessage());
        alarmMessageRepository.save(alarmMessage);
    }
}
