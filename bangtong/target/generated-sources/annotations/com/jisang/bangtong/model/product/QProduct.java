package com.jisang.bangtong.model.product;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QProduct is a Querydsl query type for Product
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QProduct extends EntityPathBase<Product> {

    private static final long serialVersionUID = 826029892L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QProduct product = new QProduct("product");

    public final NumberPath<Double> lat = createNumber("lat", Double.class);

    public final NumberPath<Double> lng = createNumber("lng", Double.class);

    public final StringPath productAdditionalOption = createString("productAdditionalOption");

    public final StringPath productAddress = createString("productAddress");

    public final StringPath productAddressDetail = createString("productAddressDetail");

    public final NumberPath<Integer> productDeposit = createNumber("productDeposit", Integer.class);

    public final DatePath<java.util.Date> productEndDate = createDate("productEndDate", java.util.Date.class);

    public final NumberPath<Long> productId = createNumber("productId", Long.class);

    public final BooleanPath productIsBanned = createBoolean("productIsBanned");

    public final BooleanPath productIsDeleted = createBoolean("productIsDeleted");

    public final BooleanPath productIsFurnitureSupportable = createBoolean("productIsFurnitureSupportable");

    public final BooleanPath productIsRentSupportable = createBoolean("productIsRentSupportable");

    public final NumberPath<Integer> productMaintenance = createNumber("productMaintenance", Integer.class);

    public final StringPath productMaintenanceInfo = createString("productMaintenanceInfo");

    public final ListPath<com.jisang.bangtong.model.media.Media, com.jisang.bangtong.model.media.QMedia> productMedia = this.<com.jisang.bangtong.model.media.Media, com.jisang.bangtong.model.media.QMedia>createList("productMedia", com.jisang.bangtong.model.media.Media.class, com.jisang.bangtong.model.media.QMedia.class, PathInits.DIRECT2);

    public final StringPath productOption = createString("productOption");

    public final DateTimePath<java.util.Date> productPostDate = createDateTime("productPostDate", java.util.Date.class);

    public final NumberPath<Integer> productRent = createNumber("productRent", Integer.class);

    public final NumberPath<Integer> productRoom = createNumber("productRoom", Integer.class);

    public final NumberPath<Double> productScore = createNumber("productScore", Double.class);

    public final NumberPath<Float> productSquare = createNumber("productSquare", Float.class);

    public final DatePath<java.util.Date> productStartDate = createDate("productStartDate", java.util.Date.class);

    public final EnumPath<ProductType> productType = createEnum("productType", ProductType.class);

    public final com.jisang.bangtong.model.region.QRegion region;

    public final com.jisang.bangtong.model.user.QUser user;

    public QProduct(String variable) {
        this(Product.class, forVariable(variable), INITS);
    }

    public QProduct(Path<? extends Product> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QProduct(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QProduct(PathMetadata metadata, PathInits inits) {
        this(Product.class, metadata, inits);
    }

    public QProduct(Class<? extends Product> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.region = inits.isInitialized("region") ? new com.jisang.bangtong.model.region.QRegion(forProperty("region")) : null;
        this.user = inits.isInitialized("user") ? new com.jisang.bangtong.model.user.QUser(forProperty("user")) : null;
    }

}

