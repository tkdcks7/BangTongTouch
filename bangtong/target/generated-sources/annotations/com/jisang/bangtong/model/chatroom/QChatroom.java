package com.jisang.bangtong.model.chatroom;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QChatroom is a Querydsl query type for Chatroom
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QChatroom extends EntityPathBase<Chatroom> {

    private static final long serialVersionUID = -1441011934L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QChatroom chatroom = new QChatroom("chatroom");

    public final DateTimePath<java.util.Date> chatroomCreatedAt = createDateTime("chatroomCreatedAt", java.util.Date.class);

    public final NumberPath<Long> chatroomId = createNumber("chatroomId", Long.class);

    public final BooleanPath chatroomMakerIsOut = createBoolean("chatroomMakerIsOut");

    public final BooleanPath chatRoomParticipantIsOut = createBoolean("chatRoomParticipantIsOut");

    public final StringPath chatroomTitle = createString("chatroomTitle");

    public final com.jisang.bangtong.model.user.QUser Maker;

    public final com.jisang.bangtong.model.user.QUser Participant;

    public final com.jisang.bangtong.model.product.QProduct product;

    public QChatroom(String variable) {
        this(Chatroom.class, forVariable(variable), INITS);
    }

    public QChatroom(Path<? extends Chatroom> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QChatroom(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QChatroom(PathMetadata metadata, PathInits inits) {
        this(Chatroom.class, metadata, inits);
    }

    public QChatroom(Class<? extends Chatroom> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.Maker = inits.isInitialized("Maker") ? new com.jisang.bangtong.model.user.QUser(forProperty("Maker")) : null;
        this.Participant = inits.isInitialized("Participant") ? new com.jisang.bangtong.model.user.QUser(forProperty("Participant")) : null;
        this.product = inits.isInitialized("product") ? new com.jisang.bangtong.model.product.QProduct(forProperty("product"), inits.get("product")) : null;
    }

}

