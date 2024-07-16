package com.jisang.bangtong.service.comment;

import com.jisang.bangtong.dto.comment.CommentDto;
import com.jisang.bangtong.model.board.Board;
import com.jisang.bangtong.model.comment.Comment;
import com.jisang.bangtong.repository.board.BoardRepository;
import com.jisang.bangtong.repository.comment.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

  @Autowired
  CommentRepository commentRepository;
  @Autowired
  BoardRepository boardRepository;

  //  댓글 작성
  public CommentDto writeComment(Long boardId, CommentDto commentDto) {
    Comment parent = commentRepository.findById(commentDto.getParentId()).orElse(null);
    Board board = boardRepository.findById(boardId).orElse(null);

    Comment comment = new Comment();
    comment.setBoard(board);
    comment.setCommentContent(commentDto.getContent());
    comment.setCommentWriterId(commentDto.getWriterId());
    comment.setCommentParent(parent);

    commentRepository.save(comment);

    return commentDto;
  }
}