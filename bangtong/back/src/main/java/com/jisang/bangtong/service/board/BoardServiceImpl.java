package com.jisang.bangtong.service.board;

import com.jisang.bangtong.dto.board.BoardSearchDto;
import com.jisang.bangtong.model.board.Board;
import com.jisang.bangtong.repository.board.BoardRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class BoardServiceImpl implements BoardService {

  @Autowired
  BoardRepository boardRepository;

  @Transactional
  @Override
  public void save(Board board, String regionId) {
    boardRepository.writeBoard(board, regionId);
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

  @Override
  public Page<Board> getBoards(Pageable pageable, BoardSearchDto boardSearchDto){
    return boardRepository.getBoards(pageable, boardSearchDto);
  }


}
