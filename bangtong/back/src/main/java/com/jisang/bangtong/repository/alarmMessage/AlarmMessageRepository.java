package com.jisang.bangtong.repository.alarmMessage;

import com.jisang.bangtong.model.alarmMessage.AlarmMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlarmMessageRepository extends JpaRepository<AlarmMessage, Long> {
}
