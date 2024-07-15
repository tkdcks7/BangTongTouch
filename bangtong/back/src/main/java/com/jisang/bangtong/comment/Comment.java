package com.jisang.bangtong.comment;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long commentId;

//  TODO: 게시물 FK 설정

  @Column(nullable = false, length = 1024)
  private String commentContent;

  @Column(nullable = false)
  private Long commentWriterId;

  private String commentDate;

//  TODO: 답댓 셀프참조
}