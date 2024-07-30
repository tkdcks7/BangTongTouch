package com.jisang.bangtong.model.interest;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QInterest is a Querydsl query type for Interest
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QInterest extends EntityPathBase<Interest> {

    private static final long serialVersionUID = -944386814L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QInterest interest = new QInterest("interest");

    public final NumberPath<Long> interest_id = createNumber("interest_id", Long.class);

    public final com.jisang.bangtong.model.product.QProduct product;

    public final com.jisang.bangtong.model.user.QUser user;

    public QInterest(String variable) {
        this(Interest.class, forVariable(variable), INITS);
    }

    public QInterest(Path<? extends Interest> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QInterest(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QInterest(PathMetadata metadata, PathInits inits) {
        this(Interest.class, metadata, inits);
    }

    public QInterest(Class<? extends Interest> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.product = inits.isInitialized("product") ? new com.jisang.bangtong.model.product.QProduct(forProperty("product"), inits.get("product")) : null;
        this.user = inits.isInitialized("user") ? new com.jisang.bangtong.model.user.QUser(forProperty("user")) : null;
    }

}

