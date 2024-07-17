package com.jisang.bangtong.repository.region;

import static com.jisang.bangtong.model.region.QRegion.region;

import com.jisang.bangtong.dto.region.RegionGugunDto;
import com.jisang.bangtong.dto.region.RegionSidoDto;
import com.jisang.bangtong.model.region.QRegion;
import com.jisang.bangtong.model.region.Region;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RegionRepositoryCustomImpl implements RegionRepositoryCustom {

  @Autowired
  private JPAQueryFactory queryFactory;

  @Override
  public List<RegionSidoDto> searchCity() {
    QRegion qRegion = region;

    return queryFactory
        .select(Projections.constructor(RegionSidoDto.class,
            qRegion.regionId.substring(0, 2).as("regionId"),
            qRegion.regionSido))
        .from(qRegion)
        .groupBy(qRegion.regionId.substring(0, 2))
        .distinct()
        .fetch();
  }

  @Override
  public List<RegionGugunDto> searchSido(String sido) {
    List<RegionGugunDto> results = queryFactory
        .select(Projections.constructor(RegionGugunDto.class, region.regionId.substring(0,5).as("regionId"), region.regionGugun))
        .from(region)
        .where(region.regionId.substring(0, 2).eq(sido)
            .and(region.regionId.substring(2, 5).ne("000")))
        .groupBy(region.regionId.substring(0, 5), region.regionGugun)
        .distinct()
        .fetch();

    return results;
  }

  @Override
  public List<Region> searchArea(String area) {
    return List.of();
  }
}
