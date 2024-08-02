package com.jisang.bangtong.model.region;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class Region {

    @Id
    @Column(length = 13)
    String regionId;

    @Column(nullable = false, length = 7)
    String regionSido;

    @Column(nullable = false, length = 10)
    String regionGugun;

    @Column(nullable = false, length = 10)
    String regionDong;

}
