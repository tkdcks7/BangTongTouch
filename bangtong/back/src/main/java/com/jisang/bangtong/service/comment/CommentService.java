package com.jisang.bangtong.service.comment;

import com.amazonaws.services.kms.model.NotFoundException;
import com.jisang.bangtong.dto.comment.CommentDto;
import com.jisang.bangtong.dto.comment.CommentReturnDto;
import com.jisang.bangtong.dto.comment.SubCommentDto;
import com.jisang.bangtong.dto.user.UserCommentReturnDto;
import com.jisang.bangtong.model.board.Board;
import com.jisang.bangtong.model.comment.Comment;
import com.jisang.bangtong.model.user.User;
import com.jisang.bangtong.repository.board.BoardRepository;
import com.jisang.bangtong.repository.comment.CommentRepository;
import com.jisang.bangtong.repository.user.UserRepository;
import com.jisang.bangtong.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
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
  @Autowired
  JwtUtil jwtUtil;


  //  댓글 작성
  public void writeComment(Long boardId, CommentDto commentDto, HttpServletRequest request) {
    log.info("Service: writeComment 시작");

    Long commentPid = commentDto.getParentId();
    if(isCommentDtoNull(commentDto)){
      throw new IllegalArgumentException("댓글 내용이 누락되었습니다.");
    }
    if(isValidParent(commentPid)){
      throw new NotFoundException("부모 댓글이 올바르지 않습니다");
    }
    if(isValidBoard(boardId)){
      throw new NotFoundException("해당 게시글이 없습니다");
    }
    String token = jwtUtil.getAccessToken(request);
    Long userId = jwtUtil.getUserIdFromToken(token);
    User writer = userRepository.findById(userId).orElse(null);
    if(!isValidUser(writer)){
      throw new NotFoundException("작성자를 찾을 수 없습니다.");
    }

    Comment comment = Comment.builder()
              .commentUser(writer)
                  .commentContent(commentDto.getContent()).build();

    Comment parentComment= commentRepository.findById(commentPid).orElse(null);
    comment.setCommentParent(parentComment);

    commentRepository.save(comment);
  }

  //  댓글 수정
  public int modifyComment(long commentId, String content, HttpServletRequest request) {
    log.info("Comment: modifyComment 실행");
    String token = jwtUtil.getAccessToken(request);
    Long userId = jwtUtil.getUserIdFromToken(token);
    if(isValidComment(commentId, userId)){
      throw new NotFoundException("해당 댓글이 없습니다");
    }
    if(content.length() >500) {
      throw new IllegalArgumentException("글자수가 너무 많습니다.");
    }
    Comment comment = commentRepository.findById(commentId).orElse(null);
    assert comment != null;
    comment.setCommentContent(content);
    comment.setCommentDate(new Date());
    commentRepository.save(comment);
    return 1;
  }

  //  댓글 삭제
  public void deleteComment(long commentId, HttpServletRequest request) {
    String token = jwtUtil.getAccessToken(request);
    Long userId = jwtUtil.getUserIdFromToken(token);
    if(isValidComment(commentId, userId)){
      throw new NotFoundException("해당 댓글이 없습니다");
    }
    commentRepository.deleteComment(commentId);
  }

  //  댓글 목록 조회
  public List<CommentReturnDto> getComments(long boardId) {
    if(!isValidBoard(boardId))
      throw new NotFoundException("해당 board를 찾지 못했습니다.");
    List<Comment> comments = commentRepository.findCommentsWithRepliesByBoardId(boardId);
    List<CommentReturnDto> commentReturnDto = new ArrayList<>();

    for (Comment comment : comments) {
        CommentReturnDto c;
        User user = comment.getCommentUser();
        List<SubCommentDto> subComment = new ArrayList<>();
        for(Comment s : comment.getComments()){
          SubCommentDto subCommentDto = SubCommentDto.builder()
              .commentId(s.getCommentId())
              .userCommentReturnDto(getuserCommentReturnDto(s.getCommentUser()))
              .content(s.getCommentContent())
              .createAt(s.getCommentDate())
              .isBanned(false)
              .build();
          subComment.add(subCommentDto);
        }


        UserCommentReturnDto u = getuserCommentReturnDto(user);
        c = CommentReturnDto.builder().commentId(comment.getCommentId())
            .userCommentReturnDto(u)
            .content(comment.getCommentContent())
                .createAt(comment.getCommentDate())
                    .subcomments(subComment)
                        .build();
        commentReturnDto.add(c);
    }

    return commentReturnDto;
  }

  private boolean isValidUser(User u){
    if(u == null){
      return false;
    }
    return true;
  }
  private boolean isValidBoard(Long boardId){
    Board board = boardRepository.findById(boardId).orElse(null);
    if(board == null){
      return false;
    }
    return true;
  }

  private boolean isCommentDtoNull(CommentDto commentDto){
    String content = commentDto.getContent();
    return commentDto.getContent() == null || content.trim().isEmpty();
  }

  private boolean isValidParent(Long parentId){
    if(parentId == null){   //부모가 없을 수도 있으니까
      return true;
    }
    Comment comment = commentRepository.findById(parentId).orElse(null);
    return comment != null;
  }

  private boolean isValidComment(Long commendId, Long userId){
    Comment comment = commentRepository.findById(commendId).orElse(null);
    if(comment == null) return false;
    return comment.getCommentUser().getUserId().equals(userId);
  }

  private UserCommentReturnDto getuserCommentReturnDto(User user){
    return UserCommentReturnDto.builder()
        .userId(user.getUserId())
        .isBanned(user.getUserIsBanned())
        .nickName(user.getUserNickname())
        .build();
  }
}
