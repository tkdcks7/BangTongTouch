package com.jisang.bangtong.service.comment;

import com.jisang.bangtong.model.comment.Comment;
import com.jisang.bangtong.repository.comment.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

  @Autowired
  CommentRepository commentRepository;

  public void save(Comment comment) {
    commentRepository.save(comment);
  }
}
