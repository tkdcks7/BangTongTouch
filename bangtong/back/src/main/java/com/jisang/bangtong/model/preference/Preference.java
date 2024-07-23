package com.jisang.bangtong.model.preference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.swing.plaf.synth.Region;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Preference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long preferenceId;

    @Column(nullable = false, length = 12)
    private String preferenceName;

    //TODO
    @Column(nullable = false)
    private Long userId = 1L;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "region_id")
    private Region region;

    @Column
    private int preferenceDeposit;

    @Column
    private int preferenceRent;

    @Column(columnDefinition = "bit(5)")
    private int preferenceType;

    @Column(columnDefinition = "but(8)")
    private int preferenceInfra;

    @Column(nullable = false)
    private Date preferenceStartDate;

    @Column(nullable = false)
    private Date preferenceEndDate;
}
