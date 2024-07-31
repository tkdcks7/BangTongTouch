package com.jisang.bangtong.dto.comment;

import com.jisang.bangtong.dto.user.UserCommentReturnDto;
import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class CommentReturnDto {
  Long commentId;
  UserCommentReturnDto userCommentReturnDto;
  String content;
  Date createAt;
  List<SubCommentDto> subcomments;
}
