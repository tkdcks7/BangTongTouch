package com.jisang.bangtong.service.preference;

import com.jisang.bangtong.dto.preference.PreferenceDto;
import com.jisang.bangtong.model.preference.Preference;
import com.jisang.bangtong.model.region.Region;
import com.jisang.bangtong.repository.preference.PreferenceRepository;
import com.jisang.bangtong.repository.region.RegionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PreferenceService {
    @Autowired
    private PreferenceRepository preferenceRepository;
    @Autowired
    private RegionRepository regionRepository;

    public void addPreference(PreferenceDto preferenceDto) {

        // 선호 설정 등록
        // String 자료형 / 넘어오는 형태: (예) 서울특별시 / 서울특별시 강서구 / 서울특별시 강서구 가양동
        // 1. '주소' 띄어쓰기 ' ' split = []
        String[] addressParts = preferenceDto.getRegionAddress().split(" ");
        Region region = null;
// 원래 문자열이 null인 경우에는 바로 return null을 때리고 종료
        //        regionRepository.findBySidoAndGugunAndDong("", "", "");
        switch (addressParts.length) {
            case 1:
                region = regionRepository.findByRegionSidoAndRegionGugunAndRegionDong(addressParts[0], "", "").orElse(null);
                break;
            case 2:
                region = regionRepository.findByRegionSidoAndRegionGugunAndRegionDong(addressParts[0], addressParts[1], "").orElse(null);
                break;
            case 3:
                region = regionRepository.findByRegionSidoAndRegionGugunAndRegionDong(addressParts[0], addressParts[1], addressParts[2]).orElse(null);
                break;
        }

        // 2. split된 문자열을 바탕으로 regionId 검색
//        Optional<Region> regionOpt = regionRepository.findByAddress(addressParts);
        // 3. regionId를 preference에 set

        Preference preference = new Preference();
        preference.setPreferenceName(preferenceDto.getPreferenceName());
//        Region region = preferenceRepository.findByRegion_RegionId(preferenceDto.getRegionId());
        preference.setPreferenceDeposit(preferenceDto.getPreferenceDeposit());
        preference.setRegion(region);
        preference.setPreferenceRent(preferenceDto.getPreferenceRent());
        preference.setPreferenceType(preferenceDto.getPreferenceType());
        preference.setPreferenceInfra(preferenceDto.getPreferenceInfra());
        preference.setPreferenceStartDate(preferenceDto.getPreferenceStartDate());
        preference.setPreferenceEndDate(preferenceDto.getPreferenceEndDate());
        preferenceRepository.save(preference);

    }
}
