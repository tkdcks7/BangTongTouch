package com.jisang.bangtong.repository.chatroom;

import com.jisang.bangtong.dto.chat.ChatReturnDto;
import com.jisang.bangtong.model.chat.Chat;
import com.jisang.bangtong.model.chat.QChat;
import com.jisang.bangtong.model.chatroom.Chatroom;
import com.jisang.bangtong.model.chatroom.QChatroom;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

@Slf4j
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

    BooleanExpression makerCondition = qChatroom.Maker.userId.eq(userId)
        .and(qChatroom.chatroomMakerIsOut.eq(false));
    BooleanExpression participantCondition = qChatroom.Participant.userId.eq(userId)
        .and(qChatroom.chatRoomParticipantIsOut.eq(false));

    List<Chatroom> chatrooms = queryFactory
        .selectFrom(qChatroom)
        .where(makerCondition.or(participantCondition))
        .fetch();
    return Optional.ofNullable(chatrooms);
  }

  @Override
  public List<Chat> getChats(Long chatroomId) {
    log.info("hihihi");
    QChat qChat = QChat.chat;
    BooleanExpression chatCondition = qChat.chatRoom.chatroomId.eq(chatroomId);

    return queryFactory
        .selectFrom(qChat)
        .where(chatCondition)
        .fetch();
  }
}
