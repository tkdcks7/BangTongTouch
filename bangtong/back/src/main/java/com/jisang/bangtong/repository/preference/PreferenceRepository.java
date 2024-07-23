package com.jisang.bangtong.repository.preference;

import com.jisang.bangtong.model.preference.Preference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.plaf.synth.Region;


@Repository
public interface PreferenceRepository extends JpaRepository<Preference, Long> {
    Region findByRegion_RegionId(String RegionId);
}
