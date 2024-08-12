package com.jisang.bangtong.model.product;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Entity
@RequiredArgsConstructor
@AllArgsConstructor
public class Productalgorithm {

  @Id
  Long productId;

  Double busstopSeoulClosestDistance;
  Integer busstopSeoulCount;
  Double cctvSeoulClosestDistance;
  Integer cctvSeoulCount;
  Double convSeoulClosestDistance;
  Integer convSeoulCount;
  Integer hospitalCount; //0.5 km에 병원 개수
  Double laundryCoinSeoulClosestDistance;
  Integer laundryCoinSeoul;
  Double pharmDistance;
  Integer pharmCount;
  Double policeDistance;
  Integer policeCount;
  Double starbuckDist;
  Integer starbuckCount;
  Double subwayDist;
  Integer subwayCount;
  Double supermarketDist;
  Integer supermarketCount;
  Double normalHospitalDist;  //병원
  Integer normalHospitalCount; //일반병원 0.5km 개수
  Double publicHealthDist;  //보건소 개수
  Integer publicHealthCount; //보건소 0.5km 개수
  Double publicUnderPublicHealth; //보건지소
  Integer publicUnderPublicHealthCount;
  Double nursingHospitalDist; //요양병원
  Integer nursingHospitalCount;
  Double smallHospitalDist; //의원
  Integer smallHospitalCount;
  Double medHospitalDist; //조산사
  Integer medHospitalCount; //조산사 숫자
  Double generalHospitalDist; //종합 병원
  Integer generalHospitalCount; //종합 병원 개수
  Double dentalHospitalDist; //치과
  Integer dentalHospitalCount;
  Double smallDentalHospitalDist;
  Integer smallDentalHospitalCount;
  Double smallOrientalHospitalDist;
  Integer smallOrientalHospitalCount;
  Double originalHospitalDist;
  Integer originalHospitalCount;
}
