package com.jisang.bangtong.model.media;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMedia is a Querydsl query type for Media
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMedia extends EntityPathBase<Media> {

    private static final long serialVersionUID = 1347882926L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMedia media = new QMedia("media");

    public final com.jisang.bangtong.model.board.QBoard board;

    public final NumberPath<Long> mediaId = createNumber("mediaId", Long.class);

    public final StringPath mediaPath = createString("mediaPath");

    public QMedia(String variable) {
        this(Media.class, forVariable(variable), INITS);
    }

    public QMedia(Path<? extends Media> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMedia(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMedia(PathMetadata metadata, PathInits inits) {
        this(Media.class, metadata, inits);
    }

    public QMedia(Class<? extends Media> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.board = inits.isInitialized("board") ? new com.jisang.bangtong.model.board.QBoard(forProperty("board"), inits.get("board")) : null;
    }

}

