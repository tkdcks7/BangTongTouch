package com.jisang.bangtong.service.region;

import com.jisang.bangtong.dto.region.RegionSidoDto;
import com.jisang.bangtong.model.region.Region;
import com.jisang.bangtong.repository.region.RegionRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegionServiceImpl implements RegionService{

  @Autowired
  private RegionRepository regionRepository;

  @Override
  public List<RegionSidoDto> searchCity() {
    return regionRepository.searchCity();
  }

  @Override
  public List<Region> searchSido(String sido) {
    return List.of();
  }

  @Override
  public List<Region> searchArea(String area) {
    return List.of();
  }
}
