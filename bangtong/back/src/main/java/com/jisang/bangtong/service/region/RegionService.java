package com.jisang.bangtong.service.region;

import com.jisang.bangtong.dto.region.RegionSidoDto;
import com.jisang.bangtong.model.region.Region;
import java.util.List;

public interface RegionService {
  List<RegionSidoDto> searchCity();
  List<Region> searchSido(String sido);
  List<Region> searchArea(String area);
}
