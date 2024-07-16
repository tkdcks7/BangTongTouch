package com.jisang.bangtong.service.board;


import com.jisang.bangtong.model.board.Board;
import java.util.List;
import java.util.Optional;

public interface BoardService {

  void save(Board board);

  Optional<Board> findById(long id);

  List<Board> findAll();

  void delete(long id);
}
