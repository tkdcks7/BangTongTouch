package com.jisang.bangtong.board.service;

import com.jisang.bangtong.board.dto.Board;
import com.jisang.bangtong.board.repository.BoardRepositoryImpl;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BoardServiceImpl implements BoardService {

  BoardRepository boardRepository;

  @Override
  public void save(Board board) {
    boardRepository.save(board);
  }

  @Override
  public Optional<Board> findById(long id) {
    return boardRepository.findById(id);
  }

  @Override
  public List<Board> findAll() {
    return boardRepository.findAll();
  }

  @Override
  public void delete(long id) {
    boardRepository.delete(id);
  }
}
