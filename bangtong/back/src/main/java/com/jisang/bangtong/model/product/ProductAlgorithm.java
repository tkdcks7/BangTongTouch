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
public class ProductAlgorithm {

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
  Double publicHealthDist;  //


}
