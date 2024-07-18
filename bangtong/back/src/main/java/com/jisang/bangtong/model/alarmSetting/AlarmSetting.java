package com.jisang.bangtong.model.alarmSetting;

import com.jisang.bangtong.dto.alarmsetting.AlarmSettingDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class AlarmSetting {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long alarmId;

  //    TODO: userID
  private Long userId = 1L;

  @Column(nullable = false, columnDefinition = "boolean default false")
  private boolean alarmPhoneChat;

  @Column(nullable = false, columnDefinition = "boolean default false")
  private boolean alarmPhoneComplete;

  @Column(nullable = false, columnDefinition = "boolean default false")
  private boolean alarmPhoneInterest;

  @Column(nullable = false, columnDefinition = "boolean default false")
  private boolean alarmEmailChat;

  @Column(nullable = false, columnDefinition = "boolean default false")
  private boolean alarmEmailComplete;

  @Column(nullable = false, columnDefinition = "boolean default false")
  private boolean alarmEmailInterest;

  public void updatealarmsetting(Long userId, AlarmSettingDto settingDto) {
  }
}
