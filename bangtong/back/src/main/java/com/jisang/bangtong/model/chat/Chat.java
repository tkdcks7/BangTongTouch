package com.jisang.bangtong.model.chat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.jisang.bangtong.model.chatroom.Chatroom;
import com.jisang.bangtong.model.media.Media;
import com.jisang.bangtong.model.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Entity
@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class Chat {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  Long chatId;

  @ManyToOne
  @JoinColumn(name="chatroomId", foreignKey = @ForeignKey(name="fk_chat_chatroom"), nullable = false)
  Chatroom chatRoom;

  @Column(length=1000, nullable = false)
  String chatContent;

  @ManyToOne
  @JoinColumn(name="senderId", foreignKey = @ForeignKey(name="fk_chat_user"), nullable = false)
  User sender;

  @Column(nullable = false)
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss.SSS", timezone = "Asia/Seoul")
  @Temporal(TemporalType.TIMESTAMP)
  Date chatTime=new Date();

}
