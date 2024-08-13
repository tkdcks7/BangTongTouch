package com.jisang.bangtong.model.algorithm.seoul;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.io.Serializable;
import lombok.Data;



@Entity
@Data
public class Hospitalposencoded {

  @Id
  Long id;
  Double lat;
  Double lng;

  Integer isHospital; //병원
  Integer isPublicHealth; //
  Integer isUnderPublicHealth;  //보건의원
  Integer isSuperPublicHealth;  //대형종합
  Integer isNursingHospital;  //요양
  Integer isSmallHospital;  //의원
  Integer isMentalHospital; //정신병원
  Integer isMidwifeHospital; //조산원
  Integer isGeneralHospital; //종합병원
  Integer isDentalHospital; //치과
  Integer isSmallDentalHospital;  //치과 의원
  Integer isSmallOrientalHospital; //한방병원
  Integer isOrientalHospital; // 한의원
}