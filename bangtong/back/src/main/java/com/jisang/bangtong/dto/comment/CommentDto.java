package com.jisang.bangtong.dto.comment;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class CommentDto {
  private String content;
  private Long parentId;
}
