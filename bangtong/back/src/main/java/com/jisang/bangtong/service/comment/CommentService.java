package com.jisang.bangtong.service.comment;

import com.jisang.bangtong.dto.comment.CommentDto;
import com.jisang.bangtong.model.board.Board;
import com.jisang.bangtong.model.comment.Comment;
import com.jisang.bangtong.repository.board.BoardRepository;
import com.jisang.bangtong.repository.comment.CommentRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

  @Autowired
  CommentRepository commentRepository;
  @Autowired
  BoardRepository boardRepository;

  //  댓글 작성
  public void writeComment(Long boardId, CommentDto commentDto) {
    Comment parent = commentRepository.findById(commentDto.getParentId()).orElse(null);
    Board board = boardRepository.findById(boardId).orElse(null);

    Comment comment = new Comment();
    
    comment.setBoard(board);
    comment.setCommentContent(commentDto.getContent());
    comment.setCommentWriterId(commentDto.getWriterId());
    comment.setCommentParent(parent);

    commentRepository.save(comment);
  }

  //  댓글 수정
  public CommentDto modifyComment(long commentId, String content) {
    Comment comment = commentRepository.findById(commentId).orElse(null);
    CommentDto commentDto = null;

    if (comment != null) {
      commentDto = new CommentDto();

      commentDto.setId(comment.getCommentId());
      commentDto.setWriterId(comment.getCommentWriterId());
//      TODO: 작성자 닉네임 불러오기
      commentDto.setContent(content);
      commentDto.setDate(comment.getCommentDate());
      commentDto.setParentId(comment.getCommentParent().getCommentId());
    }

    return commentDto;
  }

  //  댓글 삭제
  public void deleteComment(long commentId) {
    commentRepository.deleteComment(commentId);
  }

  //  댓글 목록 조회
  public List<CommentDto> getComments(long boardId) {
    List<Comment> comments = commentRepository.findByBoard_BoardId(boardId);
    List<CommentDto> dtos = null;

    if (!comments.isEmpty()) {
      dtos = new ArrayList<>();

      for (Comment comment : comments) {
        CommentDto commentDto = new CommentDto();

        commentDto.setId(comment.getCommentId());
        commentDto.setWriterId(comment.getCommentWriterId());
//        TODO: 작성자 닉네임 불러오기
        commentDto.setContent(comment.getCommentContent());
        commentDto.setDate(comment.getCommentDate());
        commentDto.setParentId(comment.getCommentParent().getCommentId());

        dtos.add(commentDto);
      }
    }

    return dtos;
  }
}
