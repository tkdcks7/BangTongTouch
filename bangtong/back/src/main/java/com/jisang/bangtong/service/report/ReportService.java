package com.jisang.bangtong.service.report;

import com.jisang.bangtong.model.user.User;
import com.jisang.bangtong.repository.report.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    public void manageReport(int reportTypeID, User userId) {

    }
}
