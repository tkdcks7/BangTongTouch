package com.jisang.bangtong.controller.comment;

import com.jisang.bangtong.dto.comment.CommentDto;
import com.jisang.bangtong.dto.comment.CommentReturnDto;
import com.jisang.bangtong.dto.common.ResponseDto;
import com.jisang.bangtong.model.comment.Comment;
import com.jisang.bangtong.service.comment.CommentService;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
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

@Slf4j
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
      @RequestBody CommentDto commentDto, HttpServletRequest request) {
    log.info("comment write {}, {}", commentDto, boardId);
    commentService.writeComment(boardId, commentDto, request);

    return ResponseEntity.ok(ResponseDto.res(SUCCESS));
  }

  //  댓글 수정
  @PutMapping("/modify/{commentId}")
  public ResponseEntity<ResponseDto<Void>> modifyComment(@PathVariable long commentId,
      @RequestBody String content, HttpServletRequest request) {
    int result = commentService.modifyComment(commentId, content, request);
    if (result != 1) {
      return ResponseEntity.ok(ResponseDto.res(CLIENT_ERROR));
    } else {
      return ResponseEntity.ok(ResponseDto.res(SUCCESS));
    }
  }

  //  댓글 삭제
  @DeleteMapping("/delete/{commentId}")
  public ResponseEntity<ResponseDto<Void>> deleteComment(@PathVariable long commentId, HttpServletRequest request) {
    commentService.deleteComment(commentId, request);
    return ResponseEntity.ok(ResponseDto.res(SUCCESS));
  }

  //  댓글 목록 조회
  //  TODO: parent의 답댓글 list 관리
  @GetMapping("/{boardId}")
  public ResponseEntity<ResponseDto<List<CommentReturnDto>>> getComments(@PathVariable long boardId) {
    List<CommentReturnDto> dtos = commentService.getComments(boardId);

    return ResponseEntity.ok(ResponseDto.res(SUCCESS, dtos));
  }


}
