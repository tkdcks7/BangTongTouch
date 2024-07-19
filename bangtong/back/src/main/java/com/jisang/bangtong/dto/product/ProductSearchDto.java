package com.jisang.bangtong.dto.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class ProductSearchDto {
/*
  order: Integer,
  minDeposit: Integer,
  maxDeposit: Integer,
  minRent: Integer,
  maxRent: Integer,
  type: String
  option: String,
  isRentSupportable: Boolean,
  isFurnitureSupportable: Boolean,
  infra: Integer,
  startDate: Date,
  endDate: Date
*/
  int order;
  int minDeposit;
  int maxDeposit;
  int minRent;
  int maxRent;
  String type;
  boolean isRentSupportable;
  boolean isFurnitureSupportable;
  String infra;
}
