package com.jisang.bangtong.repository.board;

import com.jisang.bangtong.dto.board.BoardSearchDto;
import com.jisang.bangtong.model.board.Board;
import com.jisang.bangtong.model.board.QBoard;
import com.jisang.bangtong.model.region.QRegion;
import com.jisang.bangtong.model.region.Region;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

public class BoardRepositoryCustomImpl implements BoardRepositoryCustom{

  private final JPAQueryFactory queryFactory;
  private final EntityManager entityManager;

  @Autowired
  public BoardRepositoryCustomImpl(JPAQueryFactory queryFactory, EntityManager entityManager) {
    this.queryFactory = queryFactory;
    this.entityManager = entityManager;
  }

  @Override
  public Page<Board> getBoards(Pageable pageable, BoardSearchDto boardSearchDto){
    QBoard board = QBoard.board;
    QRegion region = QRegion.region;

    JPQLQuery<Board> query = queryFactory
        .selectFrom(board)
        .leftJoin(board.boardRegion, region)
        .where(
            board.boardIsDelete.isFalse(),
            (boardSearchDto.getRegionId() != null ? region.regionId.substring(0, 8).eq(boardSearchDto.getRegionId()) : null),
            (boardSearchDto.getKeyword() != null ? board.boardTitle.contains(boardSearchDto.getKeyword()) : null)

        );
    long total = query.fetchCount();
    List<Board> contents = query
        .offset(pageable.getOffset())
        .limit(pageable.getPageSize())
        .orderBy(board.boardDate.desc())
        .fetch();
    return new PageImpl<>(contents, pageable, total);
  }

  @Override
  public void writeBoard(Board board, String regionId) {
    if (regionId == null) {
      entityManager.persist(board);
    } else {
      QRegion qRegion = QRegion.region;

      Region region = queryFactory
          .selectFrom(qRegion)
          .where(qRegion.regionId.eq(regionId))
          .fetchOne();

      if (region != null) {
        board.setBoardRegion(region);
      }
      entityManager.persist(board);
    }
  }

  @Override
  @Transactional
  public void delete(long boardId) {
    QBoard board = QBoard.board;
    queryFactory.update(board)
        .set(board.boardIsDelete, true)
        .where(board.boardId.eq(boardId))
        .execute();
  }
}
