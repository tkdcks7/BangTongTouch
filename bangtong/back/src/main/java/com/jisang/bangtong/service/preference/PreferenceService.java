package com.jisang.bangtong.service.preference;

import com.jisang.bangtong.dto.preference.PreferenceDto;
import com.jisang.bangtong.model.preference.Preference;
import com.jisang.bangtong.model.region.Region;
import com.jisang.bangtong.repository.preference.PreferenceRepository;
import com.jisang.bangtong.repository.region.RegionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
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

        Region region = new Region();
// 원래 문자열이 null인 경우에는 바로 return null을 때리고 종료
        switch (addressParts.length) {
            case 1:
                region = regionRepository.findByRegionDetails(addressParts[0], "", "").orElse(null);
                break;
            case 2:
                region = regionRepository.findByRegionDetails(addressParts[0], addressParts[1], "").orElse(null);
                break;
            case 3:
                region = regionRepository.findByRegionDetails(addressParts[0], addressParts[1], addressParts[2]).orElse(null);
                break;
        }

        // 2. split된 문자열을 바탕으로 regionId 검색
//        Optional<Region> regionOpt = regionRepository.findByAddress(addressParts);
        // 3. regionId를 preference에 set

        Preference preference = new Preference();
        preference.setPreferenceName(preferenceDto.getPreferenceName());
//        region = preferenceRepository.findByRegion_RegionId(preferenceDto.getRegionId());
        preference.setPreferenceDeposit(preferenceDto.getPreferenceDeposit());
        preference.setRegion(region);
        preference.setPreferenceRent(preferenceDto.getPreferenceRent());
        preference.setPreferenceType(preferenceDto.getPreferenceType());
        preference.setPreferenceInfra(preferenceDto.getPreferenceInfra());
        preference.setPreferenceStartDate(preferenceDto.getPreferenceStartDate());
        preference.setPreferenceEndDate(preferenceDto.getPreferenceEndDate());
        preferenceRepository.save(preference);

    }

    // 선호 설정 수정
    public PreferenceDto modifyPreference(long preferenceId, PreferenceDto preferenceDto) {
        Preference exisistingPreference = preferenceRepository.findByPreferenceId(preferenceId);

        exisistingPreference.setPreferenceName(preferenceDto.getPreferenceName());
        exisistingPreference.setPreferenceDeposit(preferenceDto.getPreferenceDeposit());
        exisistingPreference.setPreferenceRent(preferenceDto.getPreferenceRent());
        exisistingPreference.setPreferenceType(preferenceDto.getPreferenceType());
        exisistingPreference.setPreferenceInfra(preferenceDto.getPreferenceInfra());
        exisistingPreference.setPreferenceStartDate(preferenceDto.getPreferenceStartDate());
        exisistingPreference.setPreferenceEndDate(preferenceDto.getPreferenceEndDate());

        String[] addressParts = preferenceDto.getRegionAddress().split(" ");
        Region region = new Region();

        switch (addressParts.length) {
            case 1:
                region = regionRepository.findByRegionDetails(addressParts[0], "", "").orElse(null);
                break;
            case 2:
                region = regionRepository.findByRegionDetails(addressParts[0], addressParts[1], "").orElse(null);
                break;
            case 3:
                region = regionRepository.findByRegionDetails(addressParts[0], addressParts[1], addressParts[2]).orElse(null);
                break;
        }
        exisistingPreference.setRegion(region);

        Preference updatePreference = preferenceRepository.save(exisistingPreference);

        PreferenceDto updatePreferenceDto = new PreferenceDto();
        updatePreferenceDto.setPreferenceName(updatePreference.getPreferenceName());
        updatePreferenceDto.setPreferenceDeposit(updatePreference.getPreferenceDeposit());
        updatePreferenceDto.setPreferenceRent(updatePreference.getPreferenceRent());
        updatePreferenceDto.setPreferenceType(updatePreference.getPreferenceType());
        updatePreferenceDto.setPreferenceInfra(updatePreference.getPreferenceInfra());
        updatePreferenceDto.setPreferenceStartDate(updatePreference.getPreferenceStartDate());
        updatePreferenceDto.setPreferenceEndDate(updatePreference.getPreferenceEndDate());
        updatePreferenceDto.setRegionAddress(preferenceDto.getRegionAddress());

        return updatePreferenceDto;
    }

    // 선호 설정 삭제
    public void deletePreference(long preferenceId) {
        preferenceRepository.deleteById(preferenceId);
    }

    // 선호 설정 불러오기
    public PreferenceDto getPreference(long preferenceId) {
        PreferenceDto dto = new PreferenceDto();

        try {
            Preference result = preferenceRepository.findByPreferenceId(preferenceId);

            if (result != null) {
                dto.setPreferenceId(result.getPreferenceId());
                dto.setPreferenceName(result.getPreferenceName());
                dto.setUserId(result.getUserId());
                dto.setPreferenceDeposit(result.getPreferenceDeposit());
                dto.setPreferenceRent(result.getPreferenceRent());
                dto.setPreferenceType(result.getPreferenceType());
                dto.setPreferenceInfra(result.getPreferenceInfra());
                dto.setPreferenceStartDate(result.getPreferenceStartDate());
                dto.setPreferenceEndDate(result.getPreferenceEndDate());

                Region region = result.getRegion();
                dto.setRegionId(region.getRegionId());

                StringBuilder sb = new StringBuilder();
                sb.append(region.getRegionSido())
                        .append(" ")
                        .append(region.getRegionGugun())
                        .append(" ")
                        .append(region.getRegionDong());

                dto.setRegionAddress(sb.toString().trim());
            }
        } catch (Exception e) {
            return null;
        }
        return dto;
    }
}