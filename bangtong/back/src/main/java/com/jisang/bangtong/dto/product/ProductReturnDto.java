package com.jisang.bangtong.dto.product;

import com.jisang.bangtong.dto.region.RegionReturnDto;
import com.jisang.bangtong.model.media.Media;
import com.jisang.bangtong.model.product.Product;
import com.jisang.bangtong.model.product.ProductType;
import com.jisang.bangtong.model.region.Region;
import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class ProductReturnDto {
  Long productId;
  ProductType productType;
  RegionReturnDto regionReturnDto;
  String productAddress;
  Integer productDeposit;
  Integer productRent;
  Integer productMaintenance;
  String productMaintenanceInfo;
  boolean productIsRentSupportable;
  boolean productIsFurnitureSupportable;
  Float productSquare;
  Integer productRoom;
  Integer productOption;
  List<String> productAdditionalOption;
  boolean productIsBanned;
  Date productPostDate;
  Date productStartDate;
  Date productEndDate;
  Double lat;
  Double lng;
  String productAdditionalDetail;
  boolean productIsInterest;
  List<Media> mediaList;
  boolean productIsDelete;
}
