package com.jisang.bangtong.model.board;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@Entity
public class Board {

  @Id
  @GeneratedValue
  private long boardId;
  private String boardTitle;
  private String boardContent;
  private long boardWriter;

  private boolean boardIsBanned;
  private int boardCategory;

  private boolean boardIsDelete;


    /* TODO Region 클레스 생성후 1:다 연결 생성
    @OneToMany
    @JoinColumn("region_id")
    private Region
     */



}
