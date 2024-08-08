package com.jisang.bangtong.dto.chat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.jisang.bangtong.dto.user.ProfileDto;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class SendDto {
  Long chatRoom;
  Long sender;
  String chatMessage;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
  Date chatTime = new Date();

  @Override
  public String toString() {
    SimpleDateFormat formatter = new SimpleDateFormat("MM-dd HH:mm");
    String formattedDate = formatter.format(chatTime);
    return "SendDto{" +
        "chatRoom:" + chatRoom +
        ", sender:" + sender +
        ", chatMessage:'" + chatMessage + '\'' +
        ", chatTime:" + formattedDate +
        '}';
  }
}
