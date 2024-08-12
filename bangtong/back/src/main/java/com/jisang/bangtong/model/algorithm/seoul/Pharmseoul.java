package com.jisang.bangtong.model.algorithm.seoul;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Pharmseoul {
  @Id
  private String id;
  private Double lat;   //위도
  private Double lng;   //경도
}
