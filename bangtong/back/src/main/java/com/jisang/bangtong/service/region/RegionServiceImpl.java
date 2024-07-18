package com.jisang.bangtong.service.region;

import com.jisang.bangtong.dto.region.RegionDongDto;
import com.jisang.bangtong.dto.region.RegionGugunDto;
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
  public List<RegionSidoDto> searchSido() {
    return regionRepository.searchSido();
  }

  @Override
  public List<RegionGugunDto> searchGugun(String sido) {
    return regionRepository.searchGugun(sido);
  }

  @Override
  public List<RegionDongDto> searchDong(String gugun) {
    return regionRepository.searchDong(gugun);
  }
}
