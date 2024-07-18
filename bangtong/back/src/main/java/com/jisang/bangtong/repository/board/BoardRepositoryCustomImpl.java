package com.jisang.bangtong.repository.board;

import com.jisang.bangtong.model.board.Board;
import com.jisang.bangtong.model.board.QBoard;
import com.jisang.bangtong.model.region.QRegion;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

public class BoardRepositoryCustomImpl implements BoardRepositoryCustom{

  private final JPAQueryFactory queryFactory;

  @Autowired
  public BoardRepositoryCustomImpl(JPAQueryFactory queryFactory) {
    this.queryFactory = queryFactory;
  }

  @Override
  public Page<Board> getBoards(Pageable pageable, String regionId, String keyword){
    QBoard board = QBoard.board;
    QRegion region = QRegion.region;

    JPQLQuery<Board> query = queryFactory
        .selectFrom(board)
        .leftJoin(board.boardRegion, region)
        .where(
            (regionId != null ? region.regionId.substring(0, 8).eq(regionId) : null),
            (keyword != null ? board.boardTitle.contains(keyword) : null)
        );
    long total = query.fetchCount();
    List<Board> contents = query
        .offset(pageable.getOffset())
        .limit(pageable.getPageSize())
        .orderBy(board.boardDate.desc())
        .fetch();
    return new PageImpl<>(contents, pageable, total);
  }
}
