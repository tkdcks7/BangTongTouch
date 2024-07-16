package com.jisang.bangtong.model.comment;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

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

  @ManyToOne(fetch = FetchType.LAZY)
  private Comment commentParent;

  @Temporal(value = TemporalType.TIMESTAMP)
  @CreationTimestamp
  private Date commentDate;

}