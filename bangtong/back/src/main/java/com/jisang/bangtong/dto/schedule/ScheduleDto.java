package com.jisang.bangtong.dto.schedule;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleDto {
    private Long scheduleId;
    private Long chatroomId;
    private Data scheduleDate;
    private Data scheduleCreatedAt;
    private Long seller;
    private Long buyer;

}
