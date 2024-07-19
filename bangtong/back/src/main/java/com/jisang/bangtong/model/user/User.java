package com.jisang.bangtong.model.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long userId;

//  TODO: media_id FK 불러오기

  @Column(nullable = false, length = 8)
  private String userName;

  @Column(nullable = false, length = 40)
  private String userEmail;

  @Column(nullable = false, length = 256)
  private String userPassword;

  @Column(nullable = false)
  private int userBirthYear;

  @Column(nullable = false, length = 13)
  private String userPhone;

  @Column(nullable = false)
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss.SSS")
  @Temporal(TemporalType.TIMESTAMP)
  private Date userRegisterDate = new Date();

  @Column(nullable = false, length = 20)
  private String userNickname;

  @Column(nullable = false, columnDefinition = "tinyint(2)")
  private int userGender;

  @Column(columnDefinition = "ENUM('google', 'kakao', 'naver')")
  private SsoType userSso;

  @Column(columnDefinition = "boolean default false")
  private boolean userIsAdmin;

  @Column(columnDefinition = "boolean default false")
  private boolean userIsDeleted;

  @Column(columnDefinition = "boolean default false")
  private boolean userIsBanned;

}
