package com.jisang.bangtong.board.repository;

import com.jisang.bangtong.board.dto.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {

}
