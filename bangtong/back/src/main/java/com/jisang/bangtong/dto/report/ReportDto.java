package com.jisang.bangtong.dto.report;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportDto {
    private Integer reportSubjectType;
    private Integer reportTypeId;
    private String content;
    private Long subjectId;
}
