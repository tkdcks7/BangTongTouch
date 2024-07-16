package com.jisang.bangtong.dto.comment;

import lombok.Data;

@Data
public class CommentDto {

  private Long writerId;
  private String nickname;
  private String content;
  private String date;
  private Long parentId;

}
