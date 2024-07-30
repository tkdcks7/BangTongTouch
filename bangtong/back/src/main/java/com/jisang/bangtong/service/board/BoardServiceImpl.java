package com.jisang.bangtong.service.board;

import com.jisang.bangtong.dto.board.BoardSearchDto;
import com.jisang.bangtong.model.board.Board;
import com.jisang.bangtong.repository.board.BoardRepository;
import com.jisang.bangtong.repository.comment.CommentRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class BoardServiceImpl implements BoardService {

  @Autowired
  private BoardRepository boardRepository;
  @Autowired
  private CommentRepository commentRepository;

  @Transactional
  @Override
  public void save(Board board, String regionId) {
    log.info("save board {}", board);
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
  public Optional<Board> getBoardCommentParentIsNull(Long boardId) {
    Optional<Board> result = boardRepository.findById(boardId);
    if(result.isPresent()){
      result.get().setBoardComment(commentRepository.getCommentIsParentNull(boardId));
    }
    return result;
  }


}
