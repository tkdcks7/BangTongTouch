package com.jisang.bangtong.dto.preference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PreferenceDto {
    private Long preferenceId;
    private String preferenceName;
    private Long userId;
    private String regionId;
    private Integer preferenceDeposit;
    private Integer preferenceType;
    private Integer preferenceInfra;
    private String preferenceStartDate;
    private String preferenceEndDate;
}
