package com.jisang.bangtong.dto.product;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.jisang.bangtong.model.product.ProductType;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.util.Date;
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
  boolean rentSupportable;
  boolean furnitureSupportable;
  String infra;
  @Temporal(TemporalType.DATE)
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  Date startDate;
  @Temporal(TemporalType.DATE)
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  Date endDate;
}
