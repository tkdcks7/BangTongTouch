package com.jisang.bangtong.model.alarmMessage;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlarmMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long alarmMessageId;

    //    TODO: 받는 사람 ID 참조
    private Long userId;

    @Temporal(value = TemporalType.TIMESTAMP)
    @CreationTimestamp
    @Column(nullable = false)
    private Date alarmMessageDate;

    @Column(nullable = false, length = 100)
    private String alarmMessage;
}
