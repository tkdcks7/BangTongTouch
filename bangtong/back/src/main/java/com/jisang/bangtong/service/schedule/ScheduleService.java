package com.jisang.bangtong.service.schedule;

import com.jisang.bangtong.dto.schedule.ScheduleDto;
import com.jisang.bangtong.model.schedule.Schedule;
import com.jisang.bangtong.repository.schedule.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    public void createSchedule(ScheduleDto scheduleDto) {
        Schedule schedule = new Schedule();
        schedule.setScheduleDate((Date) scheduleDto.getScheduleDate());

    }
}
