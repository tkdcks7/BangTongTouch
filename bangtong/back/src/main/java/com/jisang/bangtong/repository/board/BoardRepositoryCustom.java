package com.jisang.bangtong.repository.board;

import com.jisang.bangtong.dto.board.BoardSearchDto;
import com.jisang.bangtong.model.board.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BoardRepositoryCustom {
  Page<Board> getBoards(Pageable pageable, BoardSearchDto boardSearchDto);
  void writeBoard(Board board, String regionId);
  void delete(long boardId);
}
