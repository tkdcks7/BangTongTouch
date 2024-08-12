package com.jisang.bangtong.model.algorithm.seoul;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Busstopseoul {
  @Id
  String id;
  Double lat;   //위도
  Double lng;   //경도
}
