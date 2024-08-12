package com.jisang.bangtong.repository.product;


import static com.jisang.bangtong.model.product.QProduct.product;
import static com.querydsl.core.types.dsl.Expressions.numberTemplate;

import com.jisang.bangtong.dto.product.ProductReturnDto;
import com.jisang.bangtong.dto.product.ProductSearchDto;
import com.jisang.bangtong.dto.region.RegionReturnDto;
import com.jisang.bangtong.model.media.Media;
import com.jisang.bangtong.model.product.Product;
import com.jisang.bangtong.model.product.ProductType;
import com.jisang.bangtong.model.product.QProduct;
import com.jisang.bangtong.model.region.QRegion;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberTemplate;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

@Slf4j
public class ProductRepositoryCustomImpl implements ProductRepositoryCustom{
  private final JPAQueryFactory queryFactory;
  private final EntityManager entityManager;
  private final QProduct product = QProduct.product;
  @Autowired
  public ProductRepositoryCustomImpl(JPAQueryFactory queryFactory, EntityManager entityManager) {
    this.queryFactory = queryFactory;
    this.entityManager = entityManager;
  }


  private OrderSpecifier<?>[] buildOrderSpecifiers(int order) {
    switch (order) {
      case 0:
        return new OrderSpecifier<?>[]{product.productScore.desc()};
      case 1:
        return new OrderSpecifier<?>[]{product.productPostDate.asc()};
      case 2:
        return new OrderSpecifier<?>[]{product.productDeposit.asc().nullsFirst(), product.productMaintenance.asc().nullsFirst()};
      case 3:
        return new OrderSpecifier<?>[]{product.productSquare.desc()};
      default:
        throw new IllegalArgumentException("Unknown order: " + order); // 예외를 던져서 문제 회피
    }
  }

  public List<Product> getRecentProducts(String regionId){
    QRegion qRegion = QRegion.region;

    return queryFactory.selectFrom(product)
        .where(
            product.region.regionId.eq(qRegion.regionId)
        )
        .orderBy(product.productPostDate.desc())
        .limit(3)
        .fetch();
  }
}