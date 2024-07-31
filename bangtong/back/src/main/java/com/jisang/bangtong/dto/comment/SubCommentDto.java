package com.jisang.bangtong.dto.comment;

import com.jisang.bangtong.dto.user.UserCommentReturnDto;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class SubCommentDto {
  Long commentId;
  UserCommentReturnDto userCommentReturnDto;
  Boolean isBanned;
  String content;
  Date createAt;
}
