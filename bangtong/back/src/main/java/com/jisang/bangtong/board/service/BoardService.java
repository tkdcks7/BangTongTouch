package com.jisang.bangtong.board.service;

import com.jisang.bangtong.board.dto.Board;
import java.util.List;
import java.util.Optional;

public interface BoardService {

  void save(Board board);

  Optional<Board> findById(long id);

  List<Board> findAll();

  void delete(long id);
}
