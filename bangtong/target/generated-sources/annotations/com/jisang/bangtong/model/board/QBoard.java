package com.jisang.bangtong.model.board;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBoard is a Querydsl query type for Board
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBoard extends EntityPathBase<Board> {

    private static final long serialVersionUID = -40156110L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBoard board = new QBoard("board");

    public final ListPath<com.jisang.bangtong.model.comment.Comment, com.jisang.bangtong.model.comment.QComment> boardComment = this.<com.jisang.bangtong.model.comment.Comment, com.jisang.bangtong.model.comment.QComment>createList("boardComment", com.jisang.bangtong.model.comment.Comment.class, com.jisang.bangtong.model.comment.QComment.class, PathInits.DIRECT2);

    public final StringPath boardContent = createString("boardContent");

    public final DateTimePath<java.util.Date> boardDate = createDateTime("boardDate", java.util.Date.class);

    public final NumberPath<Integer> boardHit = createNumber("boardHit", Integer.class);

    public final NumberPath<Long> boardId = createNumber("boardId", Long.class);

    public final BooleanPath boardIsBanned = createBoolean("boardIsBanned");

    public final BooleanPath boardIsDelete = createBoolean("boardIsDelete");

    public final com.jisang.bangtong.model.region.QRegion boardRegion;

    public final NumberPath<Integer> boardScore = createNumber("boardScore", Integer.class);

    public final StringPath boardTitle = createString("boardTitle");

    public final com.jisang.bangtong.model.user.QUser boardWriter;

    public QBoard(String variable) {
        this(Board.class, forVariable(variable), INITS);
    }

    public QBoard(Path<? extends Board> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBoard(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBoard(PathMetadata metadata, PathInits inits) {
        this(Board.class, metadata, inits);
    }

    public QBoard(Class<? extends Board> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.boardRegion = inits.isInitialized("boardRegion") ? new com.jisang.bangtong.model.region.QRegion(forProperty("boardRegion")) : null;
        this.boardWriter = inits.isInitialized("boardWriter") ? new com.jisang.bangtong.model.user.QUser(forProperty("boardWriter")) : null;
    }

}

