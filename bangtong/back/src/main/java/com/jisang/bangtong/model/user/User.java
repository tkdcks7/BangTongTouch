package com.jisang.bangtong.model.user;

import com.jisang.bangtong.model.product.ProductType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
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

    @Column(nullable = false)
    @Temporal(value = TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date userRegisterDate;

    @Column(nullable = false, length = 27)
    private String userSalt;

    @Column(nullable = false, length = 10)
    private String userNickname;

    @Column(nullable = false, columnDefinition = "boolean default false")
    private Boolean userIsAdmin;

    @Column(nullable = false)
    private Integer userGender;

    @Column(nullable = false, columnDefinition = "boolean default false")
    private Boolean userIsDelete;

    @Column(nullable = false, columnDefinition = "boolean default false")
    private Boolean userIsBanned;

    @Column(nullable = false, length = 256)
    private String userPassword;

    @Column(length = 37)
    private String userRefreshToken;

    public void setMediaPath(String mediaPath) {
    }

    @Column(columnDefinition = "ENUM('kakao', 'naver', 'google')")
    private SsoType ssoType;


}
