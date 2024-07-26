package com.jisang.bangtong.service.report;

import com.jisang.bangtong.dto.report.ReportDto;
import com.jisang.bangtong.model.report.Report;
import com.jisang.bangtong.repository.report.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    // 신고 전송
    public void manageReport(int reportTypeID, Long userId, ReportDto reportDto) {
        Report report = new Report();
//        report switch
    }
}
