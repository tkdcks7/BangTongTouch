package com.jisang.bangtong.model.user;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = 1748766626L;

    public static final QUser user = new QUser("user");

    public final SetPath<com.jisang.bangtong.model.common.Authority, com.jisang.bangtong.model.common.QAuthority> authorities = this.<com.jisang.bangtong.model.common.Authority, com.jisang.bangtong.model.common.QAuthority>createSet("authorities", com.jisang.bangtong.model.common.Authority.class, com.jisang.bangtong.model.common.QAuthority.class, PathInits.DIRECT2);

    public final NumberPath<Integer> userBirthYear = createNumber("userBirthYear", Integer.class);

    public final StringPath userEmail = createString("userEmail");

    public final NumberPath<Integer> userGender = createNumber("userGender", Integer.class);

    public final NumberPath<Long> userId = createNumber("userId", Long.class);

    public final BooleanPath userIsAdmin = createBoolean("userIsAdmin");

    public final BooleanPath userIsBanned = createBoolean("userIsBanned");

    public final BooleanPath userIsDeleted = createBoolean("userIsDeleted");

    public final StringPath userNickname = createString("userNickname");

    public final StringPath userPassword = createString("userPassword");

    public final StringPath userPhone = createString("userPhone");

    public final StringPath userProvider = createString("userProvider");

    public final DateTimePath<java.util.Date> userRegisterDate = createDateTime("userRegisterDate", java.util.Date.class);

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

