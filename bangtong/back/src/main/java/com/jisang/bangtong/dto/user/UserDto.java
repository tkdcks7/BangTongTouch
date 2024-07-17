package com.jisang.bangtong.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private Long id;
    private String email;
    private String profileImage;
    private String name;
    private String nickname;
    private String birthYear;
    private String phone;
    private Boolean isAdmin;
    private Integer gender;
    private Boolean isBanned;
    private String password;
}

