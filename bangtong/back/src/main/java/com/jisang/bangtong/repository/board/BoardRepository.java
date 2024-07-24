package com.jisang.bangtong.repository.board;


import com.jisang.bangtong.model.board.Board;
import com.jisang.bangtong.model.comment.Comment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long>, BoardRepositoryCustom {

}
