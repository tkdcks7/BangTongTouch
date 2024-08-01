package com.jisang.bangtong.dto.product;

import java.util.Date;
import lombok.Data;

@Data
public class ProductUpdateDto {

  private Long productId;
  private Integer productDeposit;
  private Integer productMaintenance;
  private Boolean productIsRentSupportable;
  private Boolean productIsFurnitureSupportable;
  private String productOption;
  private String productAdditionalOption;
  private Date productStartDate;
  private Date productEndDate;
//  TODO: 이미지 리스트 추가
//  private List<FileDto> files;

}
