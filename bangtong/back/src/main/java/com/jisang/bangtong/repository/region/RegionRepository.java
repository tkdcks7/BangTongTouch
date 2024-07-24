package com.jisang.bangtong.repository.region;

import com.jisang.bangtong.model.board.Board;
import com.jisang.bangtong.model.region.Region;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RegionRepository extends JpaRepository<Region, String>, RegionRepositoryCustom {
    Optional<Region> findByRegionSidoAndRegionGugunAndRegionDong(String regionSido, String regionGugun, String regionDong);
}
