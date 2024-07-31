package com.jisang.bangtong.dto.comment;

import com.fasterxml.jackson.annotation.JsonFormat;
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
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss.SSS")
  Date createAt;
  List<SubCommentDto> subcomments;
}
