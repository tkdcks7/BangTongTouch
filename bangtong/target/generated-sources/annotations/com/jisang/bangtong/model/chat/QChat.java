package com.jisang.bangtong.model.chat;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QChat is a Querydsl query type for Chat
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QChat extends EntityPathBase<Chat> {

    private static final long serialVersionUID = -1266171966L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QChat chat = new QChat("chat");

    public final StringPath chatContent = createString("chatContent");

    public final NumberPath<Long> chatId = createNumber("chatId", Long.class);

    public final com.jisang.bangtong.model.chatroom.QChatroom chatRoom;

    public final DateTimePath<java.util.Date> chatTime = createDateTime("chatTime", java.util.Date.class);

    public final ListPath<com.jisang.bangtong.model.media.Media, com.jisang.bangtong.model.media.QMedia> mediaList = this.<com.jisang.bangtong.model.media.Media, com.jisang.bangtong.model.media.QMedia>createList("mediaList", com.jisang.bangtong.model.media.Media.class, com.jisang.bangtong.model.media.QMedia.class, PathInits.DIRECT2);

    public final com.jisang.bangtong.model.user.QUser receiver;

    public final com.jisang.bangtong.model.user.QUser sender;

    public QChat(String variable) {
        this(Chat.class, forVariable(variable), INITS);
    }

    public QChat(Path<? extends Chat> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QChat(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QChat(PathMetadata metadata, PathInits inits) {
        this(Chat.class, metadata, inits);
    }

    public QChat(Class<? extends Chat> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.chatRoom = inits.isInitialized("chatRoom") ? new com.jisang.bangtong.model.chatroom.QChatroom(forProperty("chatRoom"), inits.get("chatRoom")) : null;
        this.receiver = inits.isInitialized("receiver") ? new com.jisang.bangtong.model.user.QUser(forProperty("receiver")) : null;
        this.sender = inits.isInitialized("sender") ? new com.jisang.bangtong.model.user.QUser(forProperty("sender")) : null;
    }

}

