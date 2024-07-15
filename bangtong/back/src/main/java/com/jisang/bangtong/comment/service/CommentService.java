package com.jisang.bangtong.comment.service;

import com.jisang.bangtong.comment.Comment;
import com.jisang.bangtong.comment.repository.CommentRepository;
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
