package com.jisang.bangtong.repository.board;


import com.jisang.bangtong.model.board.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {
  Page<Board> findByBoardCategoryAndBoardTitleContainingOrderByBoardDateDesc(int category, String title, Pageable pageable);
  Page<Board> findByBoardCategoryOrderByBoardDateDesc(int category, Pageable pageable);
}
