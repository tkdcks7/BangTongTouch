package com.jisang.bangtong.repository.comment;

import com.jisang.bangtong.model.comment.Comment;
import com.jisang.bangtong.model.comment.QComment;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

public class CommentRepositoryCustomImpl implements CommentRepositoryCustom{

  private final JPAQueryFactory queryFactory;
  private final EntityManager entityManager;

  @Autowired
  public CommentRepositoryCustomImpl(JPAQueryFactory queryFactory, EntityManager entityManager) {
    this.queryFactory = queryFactory;
    this.entityManager = entityManager;
  }

  @Override
  public List<Comment> getCommentIsParentNull(Long boardId){
    QComment qComment = QComment.comment;

    return queryFactory
        .select(qComment)
        .from(qComment)
        .where(qComment.commentParent.isNull()
            .and(qComment.board.boardId.eq(boardId)))
        .fetch();

  }
}
