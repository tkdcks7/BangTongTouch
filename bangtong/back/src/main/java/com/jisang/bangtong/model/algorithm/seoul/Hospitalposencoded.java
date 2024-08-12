package com.jisang.bangtong.model.algorithm.seoul;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import java.io.Serializable;
import lombok.Data;

@Embeddable
class HospitalPositionId implements Serializable {
  private Double lat;   //위도
  private Double lng;   //경도
}

@Entity
@Data
public class Hospitalposencoded {

  @EmbeddedId
  private HospitalPositionId id;

  Boolean isHospital; //병원
  Boolean isPublicHealth; //
  Boolean isUnderPublicHealth;  //보건의원
  Boolean isSuperPublicHealth;  //대형종합
  Boolean isNursingHospital;  //요양
  Boolean isSmallHospital;  //의원
  Boolean isMentalHospital; //정신병원
  Boolean isMidwifeHospital; //조산원
  Boolean isGeneralHospital; //종합병원
  Boolean isDentalHospital; //치과
  Boolean isSmallDentalHospital;  //치과 의원
  Boolean isSmallOrientalHospital; //한방병원
  Boolean isOrientalHospital; // 한의원
}