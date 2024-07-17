package com.jisang.bangtong.dto.product;

import java.util.Date;
import lombok.Data;

@Data
public class ProductDto {

  private long userId;
  private String type;
  private String regionId;
  private String address;
  private int deposit;
  private int rent;
  private int maintenance;
  private int maintenanceInfo;
  private boolean isRentSupportable;
  private boolean isFurnitureSupportable;
  private float square;
  private int room;
  private int option;
  private String additionalOption;
  private Date startDate;
  private Date endDate;
//  TODO: 이미지 리스트 추가
//  private List<FileDto> files;

}
