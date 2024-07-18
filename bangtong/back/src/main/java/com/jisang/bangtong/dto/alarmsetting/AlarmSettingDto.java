package com.jisang.bangtong.dto.alarmsetting;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AlarmSettingDto {
    private Long alarmId;
    private Long userId;
    private Boolean alarmPhoneChat;
    private Boolean alarmPhoneComplete;
    private Boolean alarmPhoneInterest;
    private Boolean alarmEmailChat;
    private Boolean alarmEmailInterest;
}
