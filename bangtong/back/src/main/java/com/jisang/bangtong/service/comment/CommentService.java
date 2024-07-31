package com.jisang.bangtong.service.comment;

import com.jisang.bangtong.dto.comment.CommentDto;
import com.jisang.bangtong.model.board.Board;
import com.jisang.bangtong.model.comment.Comment;
import com.jisang.bangtong.model.user.User;
import com.jisang.bangtong.repository.board.BoardRepository;
import com.jisang.bangtong.repository.comment.CommentRepository;
import com.jisang.bangtong.repository.user.UserRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.Builder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@Builder
public class CommentService {

  @Autowired
  CommentRepository commentRepository;
  @Autowired
  BoardRepository boardRepository;
  @Autowired
  UserRepository userRepository;

  //  댓글 작성
  public void writeComment(Long boardId, CommentDto commentDto) {
    log.info("Service: writeComment 시작");

    if(isCommentDtoNull(commentDto)){
        throw new IllegalArgumentException("댓글 내용이 누락되었습니다.");
    }
    if(isValidBoard(boardId)){
      throw new IllegalArgumentException("해당 게시글이 없습니다");
    }


    Long commentPid = commentDto.getParentId();
    Board board = boardRepository.findById(boardId).orElse(null);

    User user = userRepository.findById(commentDto.getWriterId()).orElse(null);
    if(!isValidUser(user, commentDto.getWriterId())){
      throw new IllegalArgumentException("댓글을 쓴 사용자가 다릅니다");
    }
    if(!isValidBoard(commentDto.getWriterId())){
      throw new IllegalArgumentException("게시글이 유효하지 않습니다.");
    }

    Comment comment = new Comment();
    Comment parent= null;
    if(commentPid != null)
      parent = commentRepository.findById(commentPid).orElse(null);

    comment.setCommentContent(commentDto.getContent());
    comment.setBoard(board);
    comment.setCommentParent(parent);
    comment.setCommentUser(user);

    commentRepository.save(comment);
  }

  //  댓글 수정
  public CommentDto modifyComment(long commentId, String content) {
    Comment comment = commentRepository.findById(commentId).orElse(null);
    CommentDto commentDto = null;

    if (comment != null) {
      commentDto = new CommentDto();

      commentDto.setId(comment.getCommentId());
      commentDto.setWriterId(comment.getCommentUser().getUserId());
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
  public List<Comment> getComments(long boardId) {
    List<Comment> comments = commentRepository.findByBoard_BoardId(boardId);
    //log.info("comments {}", comments);
    List<CommentDto> dtos = null;

    if (!comments.isEmpty()) {
      dtos = new ArrayList<>();

      for (Comment comment : comments) {
        CommentDto commentDto = new CommentDto();

        commentDto.setId(comment.getCommentId());
        commentDto.setWriterId(comment.getCommentUser().getUserId());
//        TODO: 작성자 닉네임 불러오기
        commentDto.setContent(comment.getCommentContent());
        commentDto.setDate(comment.getCommentDate());
        if(comment.getCommentParent() != null)
          commentDto.setParentId(comment.getCommentParent().getCommentId());

        dtos.add(commentDto);
      }
    }

    return comments;
  }

  private boolean isValidUser(User u, Long writeUserId){
    if(u == null){
      return false;
    }
    return u.getUserId().equals(writeUserId);
  }
  private boolean isValidBoard(Long boardId){
    Board board = boardRepository.findById(boardId).orElse(null);
    if(board == null){
      return false;
    }
    return true;
  }

  private boolean isCommentDtoNull(CommentDto commentDto){
    if(commentDto.getContent() == null) return true;
    return false;
  }
}
