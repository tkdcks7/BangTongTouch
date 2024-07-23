package com.jisang.bangtong.service.preference;

import com.jisang.bangtong.dto.preference.PreferenceDto;
import com.jisang.bangtong.model.preference.Preference;
import com.jisang.bangtong.repository.preference.PreferenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PreferenceService {
    @Autowired
    private PreferenceRepository preferenceRepository;

    public void preferenceAdd(PreferenceDto preferenceDto) {
        Preference preference = new Preference();
        preference.setPreferenceName(preferenceDto.getPreferenceName());
        preference.setRegion(preferenceRepository.findByRegion_RegionId(preferenceDto.getRegionId()));
    }
}
