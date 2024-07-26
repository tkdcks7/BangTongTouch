package com.jisang.bangtong.repository.region;

import com.jisang.bangtong.model.region.Region;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegionRepository extends JpaRepository<Region, String>, RegionRepositoryCustom {

}