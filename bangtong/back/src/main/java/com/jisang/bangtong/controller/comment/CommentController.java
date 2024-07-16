package com.jisang.bangtong.controller.comment;

import com.jisang.bangtong.dto.comment.CommentDto;
import com.jisang.bangtong.model.common.ResponseDto;
import com.jisang.bangtong.service.comment.CommentService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/comments")
public class CommentController {

  private final String SUCCESS = "success";
  private final String SERVER_ERROR = "server_error";
  private final String CLIENT_ERROR = "client_error";

  @Autowired
  private CommentService commentService;

  //  댓글 작성
  @PostMapping("/{boardId}/write")
  public ResponseEntity<ResponseDto<Void>> writeComment(@PathVariable long boardId,
      @RequestBody CommentDto commentDto) {
    commentService.writeComment(boardId, commentDto);

    return ResponseEntity.ok(ResponseDto.res(SUCCESS));
  }

  //  댓글 수정
  @PutMapping("/modify/{commentId}")
  public ResponseEntity<ResponseDto<CommentDto>> modifyComment(@PathVariable long commentId,
      @RequestBody Map<String, String> map) {
    CommentDto commentDto = commentService.modifyComment(commentId, map.get("content"));

    if (commentDto == null) {
      return ResponseEntity.ok(ResponseDto.res(CLIENT_ERROR));
    } else {
      return ResponseEntity.ok(ResponseDto.res(SUCCESS, commentDto));
    }
  }

  //  댓글 삭제
  @DeleteMapping("/delete/{commentId}")
  public ResponseEntity<ResponseDto<Void>> deleteComment(@PathVariable long commentId) {
    commentService.deleteComment(commentId);

    return ResponseEntity.ok(ResponseDto.res(SUCCESS));
  }

  //  댓글 목록 조회
  //  TODO: parent의 답댓글 list 관리
  @GetMapping("/{boardId}")
  public ResponseEntity<ResponseDto<List<CommentDto>>> getComments(@PathVariable long boardId) {
    List<CommentDto> dtos = commentService.getComments(boardId);

    return ResponseEntity.ok(ResponseDto.res(SUCCESS, dtos));
  }
}
