package com.jisang.bangtong.service.region;

import com.jisang.bangtong.model.region.Region;
import java.util.List;

public interface RegionService {
  List<Region> searchCity();
  List<Region> searchSido(String sido);
  List<Region> searchArea(String area);
}
