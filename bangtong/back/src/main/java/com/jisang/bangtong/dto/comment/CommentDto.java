package com.jisang.bangtong.dto.comment;

import java.util.Date;
import lombok.Data;

@Data
public class CommentDto {

  private Long id;
  private Long writerId;
  private String nickname;
  private String content;
  private Date date;
  private Long parentId;

}
