package com.jisang.bangtong.controller.schedule;

import com.jisang.bangtong.dto.common.ResponseDto;
import com.jisang.bangtong.dto.schedule.ScheduleDto;
import com.jisang.bangtong.service.schedule.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/schedules")
public class scheduleController {
    @Autowired
    private ScheduleService scheduleService;

    // 예약 생성
    @PostMapping("/add")
    public ResponseDto<Void> createSchedule(@RequestBody ScheduleDto scheduleDto) {
        scheduleService.createSchedule(scheduleDto);

        return ResponseDto.res("SUCCESS");
    }
}
