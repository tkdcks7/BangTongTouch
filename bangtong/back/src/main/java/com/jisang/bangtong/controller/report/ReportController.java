package com.jisang.bangtong.controller.report;

import com.jisang.bangtong.dto.common.ResponseDto;
import com.jisang.bangtong.model.user.User;
import com.jisang.bangtong.service.report.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    private final String SUCCESS = "success";
    private final String CLIENT_ERROR = "client_error";
    private final String SERVER_ERROR = "server_error";

    // 신고 전송
    @PostMapping("/{reportTypeID}/{userId")
    public ResponseDto<Void> manageReport(@PathVariable int reportTypeID, @PathVariable User user) {
        reportService.manageReport(reportTypeID, user);
        return ResponseDto.res(SUCCESS);
    }
}
