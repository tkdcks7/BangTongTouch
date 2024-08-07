package com.jisang.bangtong.repository.chatroom;

import com.jisang.bangtong.dto.chat.ChatReturnDto;
import com.jisang.bangtong.dto.chatroom.ChatroomReturnDto;
import com.jisang.bangtong.dto.product.ProductReturnDto;
import com.jisang.bangtong.dto.region.RegionReturnDto;
import com.jisang.bangtong.dto.user.IUser;
import com.jisang.bangtong.model.chat.Chat;
import com.jisang.bangtong.model.chat.QChat;
import com.jisang.bangtong.model.chatroom.Chatroom;
import com.jisang.bangtong.model.chatroom.QChatroom;
import com.jisang.bangtong.model.media.QMedia;
import com.jisang.bangtong.model.product.QProduct;
import com.jisang.bangtong.model.region.QRegion;
import com.jisang.bangtong.model.user.QUser;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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
  public List<ChatroomReturnDto> getChatroom(Long userId) {
    QChatroom qChatroom = QChatroom.chatroom;
    QProduct qProduct = QProduct.product;
    QUser qUser = QUser.user;
    QRegion qRegion = QRegion.region;
    QMedia qMedia = QMedia.media;

//    BooleanExpression makerCondition = qChatroom.Maker.userId.eq(userId)
//        .and(qChatroom.chatroomMakerIsOut.eq(false));
//    BooleanExpression participantCondition = qChatroom.Participant.userId.eq(userId)
//        .and(qChatroom.chatroomParticipantIsOut.eq(false));

    List<ChatroomReturnDto> chatrooms = queryFactory
        .select(Projections.constructor(ChatroomReturnDto.class,
            qChatroom.chatroomId.as("chatroomId"),
            Projections.constructor(ProductReturnDto.class,
                qProduct.productId,
                qProduct.productType,
                Projections.constructor(RegionReturnDto.class,
                    qRegion.regionId,
                    qRegion.regionSido,
                    qRegion.regionGugun,
                    qRegion.regionDong
                ),
                qProduct.productAddress,
                qProduct.productDeposit,
                qProduct.productRent,
                qProduct.productMaintenance,
                qProduct.productMaintenanceInfo,
                qProduct.productIsRentSupportable,
                qProduct.productIsFurnitureSupportable,
                qProduct.productSquare,
                qProduct.productRoom,
                qProduct.productOption,
                qProduct.productAdditionalOption,
                qProduct.productIsBanned,
                qProduct.productPostDate,
                qProduct.productStartDate,
                qProduct.productEndDate,
                qProduct.lat,
                qProduct.lng,
                qProduct.productAddressDetail,
                Expressions.constant(true), // productIsInterest (상수로 처리)
                qProduct.productMedia,
                qProduct.productIsDeleted
            ),
            Projections.constructor(IUser.class,
                qUser.userId,
                qUser.userNickname,
                qUser.userIsBanned
            ),
            qChatroom.chatroomCreatedAt
        ))
        .from(qChatroom)
        .leftJoin(qChatroom.product, qProduct)
        .leftJoin(qProduct.region, qRegion)
        //.leftJoin(qChatroom.Maker, qUser)
        .leftJoin(qProduct.productMedia, qMedia)
        //.leftJoin(qChatroom.Participant, qUser) // Participant에 대해 또 다른 별칭
        //.where(makerCondition.or(participantCondition))
        .fetch();

    log.info("chat {}", chatrooms);

//    // 쿼리 결과 변환
//    for (ChatroomReturnDto chatroom : chatrooms) {
//      ProductReturnDto product = chatroom.getProductReturnDto();
//      if (product != null) {
//        String additionalOptionStr = product.getProductAdditionalOption() != null ?
//            product.getProductAdditionalOption().toString() : "";
//        List<String> additionalOptions = !additionalOptionStr.isEmpty() ?
//            Arrays.stream(additionalOptionStr.split(","))
//                .map(String::trim)
//                .collect(Collectors.toList()) : null;
//        product.setProductAdditionalOption(additionalOptions);
//      }
//    }
    log.info("왜 안되지 ?{}", chatrooms);
    return chatrooms;
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
