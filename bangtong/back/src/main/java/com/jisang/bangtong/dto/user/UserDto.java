package com.jisang.bangtong.dto.user;

import com.jisang.bangtong.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Optional;

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

    public UserDto(Optional<User> user) {
    }

    public Long getUserId() {
    }
}

