package com.jisang.bangtong.dto.alarmMessage;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AlarmMessageDto {
    private Long alarmMessageId;
    private Long userId;
    private Date alarmMessageDate;
    private String alarmMessage;
}
