package com.jisang.bangtong.controller.comment;

import com.jisang.bangtong.dto.comment.CommentDto;
import com.jisang.bangtong.model.common.ResponseDto;
import com.jisang.bangtong.service.comment.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/comment")
public class CommentController {

  private final String SUCCESS = "success";
  private final String SERVER_ERROR = "server_error";
  private final String CLIENT_ERROR = "client_error";

  @Autowired
  private CommentService commentService;

  //  댓글 작성
  @PostMapping("/{boardId}/write")
  public ResponseEntity<ResponseDto<CommentDto>> writeComment(@PathVariable long boardId,
      @RequestBody CommentDto commentDto) {
    commentDto = commentService.writeComment(boardId, commentDto);

    return ResponseEntity.ok(ResponseDto.res(SUCCESS, commentDto));
  }

}