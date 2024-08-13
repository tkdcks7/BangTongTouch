package com.jisang.bangtong.repository.product.algorithm;

import com.jisang.bangtong.model.algorithm.seoul.Busstopseoul;
import com.jisang.bangtong.model.algorithm.seoul.QBusstopseoul;
import com.jisang.bangtong.model.product.Productalgorithm;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.EntityPathBase;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.jpa.impl.JPAQuery;
import jakarta.persistence.EntityManager;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

@Repository
@Slf4j
public class ProductAlgorithmCustomRepositoryImpl implements ProductAlgorithmCustomRepository {

  private final EntityManager em;

  public ProductAlgorithmCustomRepositoryImpl(EntityManager em) {
    this.em = em;
  }

  public Productalgorithm getProductalgorithm(Double lat, Double lng) {
    Productalgorithm productalgorithm = new Productalgorithm();
    productalgorithm.setLat(lat);
    productalgorithm.setLng(lng);

    log.info("ProductAlgorithmCustomRepositoryImpl lat {}, lng{}", lat, lng);

    long busCnt = countBusStopsWithinRadius(lat, lng);
    double busDist =findShortestDistance(lat, lng);
    productalgorithm.setBusstopSeoulClosestDistance(busDist);
    productalgorithm.setBusstopSeoulCount(busCnt);

    em.persist(productalgorithm);
    return productalgorithm;
  }

  // 가장 짧은 거리 구하기
  public double findShortestDistance(double refLat, double refLon) {
    QBusstopseoul busstop = QBusstopseoul.busstopseoul;

    return new JPAQuery<>(em)
        .select(calculateDistance(busstop.lat, busstop.lng, refLat, refLon).min())
        .from(busstop)
        .fetchOne();
  }


  // 0.5km 내에 있는 버스 정류장의 개수 구하기
  public long countBusStopsWithinRadius(double refLat, double refLon) {
    QBusstopseoul busstop = QBusstopseoul.busstopseoul;
    double radiusKm = 0.5; // 0.5km

    return countEntitiesWithinRadius(busstop, refLat, refLon, radiusKm);
  }

  private NumberExpression<Double> calculateDistance(NumberPath<Double> targetLat, NumberPath<Double> targetLon,
      double refLat, double refLon) {
    double radianPerDegree = Math.PI / 180.0;
    double earthRadiusKm = 6371.0;

    // 라디안 변환
    NumberExpression<Double> refLatExpr = Expressions.asNumber(refLat * radianPerDegree);
    NumberExpression<Double> refLonExpr = Expressions.asNumber(refLon * radianPerDegree);
    NumberExpression<Double> targetLatRad = targetLat.multiply(radianPerDegree);
    NumberExpression<Double> targetLonRad = targetLon.multiply(radianPerDegree);

    // Haversine formula implementation
    NumberExpression<Double> deltaLat = targetLatRad.subtract(refLatExpr);
    NumberExpression<Double> deltaLon = targetLonRad.subtract(refLonExpr);

    NumberExpression<Double> a = Expressions.numberTemplate(Double.class,
        "sin({0}/2) * sin({0}/2) + cos({1}) * cos({2}) * sin({3}/2) * sin({3}/2)",
        deltaLat, refLatExpr, targetLatRad, deltaLon);

    NumberExpression<Double> c = Expressions.numberTemplate(Double.class,
        "2 * atan2(sqrt({0}), sqrt(1 - {0}))", a);

    return c.multiply(earthRadiusKm);
  }

  // 제네릭 제거, 대신 Q타입을 사용한 명확한 정의
  private long countEntitiesWithinRadius(QBusstopseoul entity, double refLat, double refLon, double radiusKm) {
    NumberPath<Double> targetLat = entity.lat;
    NumberPath<Double> targetLon = entity.lng;

    return new JPAQuery<>(em)
        .select(entity.count())
        .from(entity)
        .where(withinRadius(targetLat, targetLon, refLat, refLon, radiusKm))
        .fetchOne();
  }

  private BooleanExpression withinRadius(NumberPath<Double> targetLat, NumberPath<Double> targetLon,
      double refLat, double refLon, double radiusKm) {
    double radianPerDegree = Math.PI / 180.0;
    double earthRadiusKm = 6371.0;

    NumberExpression<Double> refLatExpr = Expressions.asNumber(refLat * radianPerDegree);
    NumberExpression<Double> refLonExpr = Expressions.asNumber(refLon * radianPerDegree);
    NumberExpression<Double> targetLatRad = targetLat.multiply(radianPerDegree);
    NumberExpression<Double> targetLonRad = targetLon.multiply(radianPerDegree);

    NumberExpression<Double> deltaLat = targetLatRad.subtract(refLatExpr);
    NumberExpression<Double> deltaLon = targetLonRad.subtract(refLonExpr);

    NumberExpression<Double> sinDeltaLatDiv2 = Expressions.numberTemplate(Double.class, "sin({0}/2)", deltaLat);
    NumberExpression<Double> sinDeltaLonDiv2 = Expressions.numberTemplate(Double.class, "sin({0}/2)", deltaLon);

    NumberExpression<Double> a = sinDeltaLatDiv2.multiply(sinDeltaLatDiv2)
        .add(Expressions.numberTemplate(Double.class, "cos({0}) * cos({1}) * {2} * {2}",
            refLatExpr, targetLatRad, sinDeltaLonDiv2));

    NumberExpression<Double> c = Expressions.numberTemplate(Double.class, "2 * atan2(sqrt({0}), sqrt(1 - {0}))", a);

    NumberExpression<Double> distanceKm = c.multiply(earthRadiusKm);

    return distanceKm.loe(radiusKm);
  }
}


