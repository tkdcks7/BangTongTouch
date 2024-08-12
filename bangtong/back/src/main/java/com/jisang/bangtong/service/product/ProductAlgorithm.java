package com.jisang.bangtong.service.product;

import jakarta.transaction.Transactional;

@Transactional
public interface ProductAlgorithm {

  void calculateDistances(String targetTableName, double radiusKm);


}
