package com.jisang.bangtong.board.controller;

import com.jisang.bangtong.board.dto.Board;
import com.jisang.bangtong.board.service.BoardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/boards")
public class BoardController {

  @Autowired
  private BoardService boardService;

  @RequestMapping("/write")
  public ResponseEntity<Void> write(@RequestBody Board board) {
    log.info("write board: {}", board);
    return null;
  }

}
