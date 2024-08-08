package com.jisang.bangtong.repository.product;


import static com.jisang.bangtong.model.product.QProduct.product;

import com.jisang.bangtong.dto.product.ProductSearchDto;
import com.jisang.bangtong.model.product.Product;
import com.jisang.bangtong.model.product.ProductType;
import com.jisang.bangtong.model.product.QProduct;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberTemplate;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
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

  @Override
  public List<Product> searchList(ProductSearchDto productSearchDto) {
    log.info("productSearchDto:{}", productSearchDto);

    NumberTemplate<Double> distanceExpression = Expressions.numberTemplate(Double.class,
        "6371 * acos(cos(radians({0})) * cos(radians({1})) * cos(radians({2}) - radians({3})) + sin(radians({0})) * sin(radians({1})))",
        productSearchDto.getLat(), product.lat, product.lng, productSearchDto.getLng()
    );

    return queryFactory.selectFrom(product)
        .where(
            product.productDeposit.lt(productSearchDto.getMaxDeposit())
                .and(product.productMaintenance.lt(productSearchDto.getMaxRent()))
                .and(product.productType.eq(ProductType.valueOf(productSearchDto.getType())))
                .and(product.productIsRentSupportable.eq(productSearchDto.isRentSupportable()))
                .and(product.productIsFurnitureSupportable.eq(productSearchDto.isFurnitureSupportable()))
                .and(product.productStartDate.goe(productSearchDto.getStartDate()))
                .and(product.productEndDate.loe(productSearchDto.getEndDate()))
                .and(distanceExpression.lt(1))
        )
        .orderBy(buildOrderSpecifiers(productSearchDto.getOrder()))
        .fetch();
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
}
