package com.jisang.bangtong.service.board;


import com.jisang.bangtong.dto.board.BoardSearchDto;
import com.jisang.bangtong.model.board.Board;
import com.jisang.bangtong.model.comment.Comment;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BoardService {

  void save(Board board, String regionId);

  Optional<Board> findById(long id);

  List<Board> findAll();

  void delete(long id);
  Optional<Board> getBoardCommentParentIsNull(Long boardId);
  Page<Board> getBoards(Pageable pageable, BoardSearchDto boardSearchDto);

}
