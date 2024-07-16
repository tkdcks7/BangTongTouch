package com.jisang.bangtong.controller.board;

import com.jisang.bangtong.model.board.Board;
import com.jisang.bangtong.service.board.BoardService;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/boards")
public class BoardController {

  @Autowired
  private BoardService boardService;

  @PostMapping("/write")
  public ResponseEntity<Object> write(@RequestBody Board board) {
    log.info("write board: {}", board);
    boardService.save(board); // BoardService의 save 메서드 호출
    Map<String, Object> response = new HashMap<>();
    response.put("status", 200);
    response.put("message", "SUCCESS");
    response.put("board", board);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @PutMapping("/modify/{boardId}")
  public ResponseEntity<Object> modify(@PathVariable("boardId") long boardId, @RequestBody Board board) {
    log.info("modify board: {}", board);
    Optional<Board> existingBoard = boardService.findById(boardId);
    if (existingBoard.isPresent()) {
      Board updatedBoard = existingBoard.get();
      updatedBoard.setBoardTitle(board.getBoardTitle());
      updatedBoard.setBoardContent(board.getBoardContent());
      boardService.save(updatedBoard); // 수정된 게시물을 BoardService의 save 메서드로 업데이트
      Map<String, Object> response = new HashMap<>();
      response.put("status", 200);
      response.put("message", "SUCCESS");
      response.put("board", updatedBoard); // 수정된 Board 객체 추가
      return ResponseEntity.status(HttpStatus.OK).body(response);
    } else {
      Map<String, Object> response = new HashMap<>();
      response.put("status", 200);
      response.put("message", "SUCCESS");
      return ResponseEntity.status(HttpStatus.OK).body(response);
    }

  }

  @DeleteMapping("/delete/{boardId}")
  public ResponseEntity<Object> delete(@PathVariable("boardId") long boardId) {
    log.info("delete board: {}", boardId);
    boardService.delete(boardId); // BoardService의 delete 메서드 호출
    Map<String, Object> response = new HashMap<>();
    response.put("status", 200);
    response.put("message", "SUCCESS");
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @GetMapping("/{boardId}")
  public ResponseEntity<Object> get(@PathVariable("boardId") long boardId) {
    log.info("get board: {}", boardId);
    Optional<Board> board = boardService.findById(boardId);
    Map<String, Object> response = new HashMap<>();
    if (board.isPresent()) {
      response.put("status", 200);
      response.put("message", "SUCCESS");
      response.put("board", board.get());
      return ResponseEntity.status(HttpStatus.OK).body(response);
    } else {
      response.put("status", 200);
      response.put("message", "Board not found");
      return ResponseEntity.status(HttpStatus.OK).body(response);
    }
  }

  @GetMapping("/list/{category}/{pageNo}/{size}")
  public ResponseEntity<Object> getList(@PathVariable(value = "category", required = false) Integer category,
      @PathVariable(value = "pageNo", required = false) Integer pageNo,
      @PathVariable(value = "size", required = false) Integer size) {
        if (category == null) {
          category = 0;  // 기본값 설정
        }
        if (pageNo == null) {
          pageNo = 0;  // 기본값 설정
        }
        if (size == null) {
          size = 10;  // 기본값 설정
        }
      Pageable pageable = PageRequest.of(pageNo, size, Sort.by("boardDate"));
      Page<Board> boardPage = boardService.getBoardsByCategory(category, pageable);
      return ResponseEntity.ok(boardPage);
  }

  @GetMapping("/search/{category}/{pageNo}/{size}/{region}/{keyword}")
  public ResponseEntity<Object> getSearch(@PathVariable(required = false) Integer category,
      @PathVariable(value = "pageNo", required = false) Integer pageNo, @PathVariable(value="size") Integer size, @PathVariable String region, @PathVariable(required = false) String keyword) {
    if (category == null) {
      category = 0;  // 기본값 설정
    }
    if (pageNo == null) {
      pageNo = 0;  // 기본값 설정
    }
    if (size == null) {
      size = 10;  // 기본값 설정
    }
    Pageable pageable = PageRequest.of(pageNo, size, Sort.by("boardDate"));

    return null;
  }
}
