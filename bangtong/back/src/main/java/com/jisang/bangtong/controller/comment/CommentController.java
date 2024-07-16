package com.jisang.bangtong.controller.comment;

import com.jisang.bangtong.model.comment.Comment;
import com.jisang.bangtong.service.comment.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/comment")
public class CommentController {

  @Autowired
  private CommentService commentService;

  // 댓글 작성 (생성)
  @PostMapping("/add")
  public void addComment(@RequestBody Comment comment) {
    commentService.save(comment);
  }
}
