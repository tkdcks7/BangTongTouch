package com.jisang.bangtong.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

//    Todo: Column
//    private Integer mediaId

    @Column(nullable = false, length = 8)
    private String userName;

    @Column(nullable = false, length = 40)
    private String userEmail;

    @Column(nullable = false, length = 4)
    private String userBirthYear;

    @Column(nullable = false, length = 13)
    private String userPhone;

//    TODO: ColumnDefault(now())
//    private String userRegisterDate;
    @Column(nullable = false, length = 27)
    private String userSalt;

    @Column(nullable = false, length = 10)
    private String userNickname;

    @Column(nullable = false)
    private Boolean userIsAdmin;

    @Column(nullable = false)
    private Integer userGender;

    @Column(nullable = false)
    private Boolean userIsDelete;

    @Column(nullable = false)
    private Boolean userIsBanned;

    @Column(nullable = false, length = 256)
    private String userPassword;

    @Column(length = 37)
    private String userRefreshToken;

    @Enumerated
    @Column(nullable = false)
    private UserUserSso userSso;

}
