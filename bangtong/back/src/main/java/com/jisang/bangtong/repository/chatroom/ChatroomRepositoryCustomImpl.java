package com.jisang.bangtong.repository.chatroom;

import com.jisang.bangtong.model.chatroom.Chatroom;
import com.jisang.bangtong.model.chatroom.QChatroom;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;

public class ChatroomRepositoryCustomImpl implements ChatroomRepositoryCustom {
  private final JPAQueryFactory queryFactory;
  private final EntityManager entityManager;

  @Autowired
  public ChatroomRepositoryCustomImpl(JPAQueryFactory queryFactory, EntityManager entityManager) {
    this.queryFactory = queryFactory;
    this.entityManager = entityManager;
  }


  @Override
  public Optional<List<Chatroom>> getChatroom(Long userId) {
    QChatroom qChatroom = QChatroom.chatroom;
    List<Chatroom> chatrooms = queryFactory
        .selectFrom(qChatroom)
        .where(qChatroom.user1.userId.eq(userId).or(qChatroom.user2.userId.eq(userId))
            .and(qChatroom.chatrootIsEnded.eq(false)))
        .fetch();
    return Optional.ofNullable(chatrooms);
  }
}
