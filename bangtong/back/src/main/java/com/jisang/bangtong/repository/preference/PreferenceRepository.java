package com.jisang.bangtong.repository.preference;

import com.jisang.bangtong.model.preference.Preference;
import com.jisang.bangtong.model.region.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PreferenceRepository extends JpaRepository<Preference, Long> {
    Region findByRegion_RegionId(String regionId);

    Preference findByPreferenceId(long preferenceId);
}
