package com.jisang.bangtong.dto.user;

import lombok.Data;

@Data
public class ProfileDto {
    private Long userId;
    private String mediaPath;
    private String userNickname;

}
