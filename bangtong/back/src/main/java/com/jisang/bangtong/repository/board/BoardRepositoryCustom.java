package com.jisang.bangtong.repository.board;

import com.jisang.bangtong.model.board.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BoardRepositoryCustom {
  Page<Board> getBoards(Pageable pageable, String region, String keyword);
}
