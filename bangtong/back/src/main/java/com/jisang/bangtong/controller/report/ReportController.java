package com.jisang.bangtong.controller.report;

import com.jisang.bangtong.dto.common.ResponseDto;
import com.jisang.bangtong.dto.report.ReportDto;
import com.jisang.bangtong.model.user.User;
import com.jisang.bangtong.service.report.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    private final String SUCCESS = "success";
    private final String CLIENT_ERROR = "client_error";
    private final String SERVER_ERROR = "server_error";

    // 신고 전송
    @PostMapping("/{reportTypeID}/{userId}")
    public ResponseDto<Void> manageReport(@PathVariable int reportTypeID, @PathVariable Long userId, @RequestBody ReportDto reportDto) {
        reportService.manageReport(reportTypeID, userId, reportDto);
        return ResponseDto.res(SUCCESS);
    }
}
