package com.jisang.bangtong.model.board;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
public class Board {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long boardId;

  @Column(nullable = false, length = 50)
  private String boardTitle;

  @Column(nullable = false, length = 1024)
  private String boardContent;

  @Column(nullable = false)
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss.SSS")
  @Temporal(TemporalType.TIMESTAMP)
  private Date boardDate = new Date();  // 현재 시간을 기본값으로 설정

  @Column(nullable = false)
  private boolean boardIsBanned = false;  // 기본값을 코드에서 직접 설

  @Column(nullable = false)
  private boolean boardIsDelete = false;  // 기본값을 코드에서 직접 설정

  @Column(nullable = false)
  private int boardHit = 0;  // 기본값을 코드에서 직접 설정

  @Column(nullable = false)
  private int boardScore = 0;

  // TODO: Region 클래스 생성 후 관계 설정
  // @ManyToOne
  // private Region boardRegion;

  // TODO: User 클래스 생성 후 관계 설정
  // @ManyToOne
  // private User boardWriter;
}