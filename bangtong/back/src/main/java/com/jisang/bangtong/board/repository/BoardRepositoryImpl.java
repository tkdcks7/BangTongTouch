package com.jisang.bangtong.board.repository;

import com.jisang.bangtong.board.dto.Board;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
@RequiredArgsConstructor
public class BoardRepositoryImpl {

  private final BoardRepository boardRepository;

  public void save(Board board) {
    boardRepository.save(board);
  }


  public Optional<Board> findById(long id) {
    return boardRepository.findById(id);
  }

  public List<Board> findAll() {
    return boardRepository.findAll();
  }

  public void delete(long id) {
    boardRepository.deleteById(id);
  }


}
