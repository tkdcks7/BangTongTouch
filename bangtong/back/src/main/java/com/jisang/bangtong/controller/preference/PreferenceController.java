package com.jisang.bangtong.controller.preference;

import com.jisang.bangtong.dto.common.ResponseDto;
import com.jisang.bangtong.dto.preference.PreferenceDto;
import com.jisang.bangtong.service.preference.PreferenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/preferences")
public class PreferenceController {

    @Autowired
    private PreferenceService preferenceService;
    private final String SUCCESS = "success";
    private final String CLIENT_ERROR = "client_error";
    private final String SERVER_ERROR = "server_error";

    // 선호 설정 등록
    @PostMapping("/add/{userId}")
    public ResponseDto<Void> addPreference(@PathVariable long userId, @RequestBody PreferenceDto preferenceDto) {
        preferenceService.addPreference(preferenceDto);
        return ResponseDto.res(SUCCESS);
    }
}
