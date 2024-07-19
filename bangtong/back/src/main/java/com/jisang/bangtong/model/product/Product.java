package com.jisang.bangtong.model.product;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long productId;

  @Column(columnDefinition = "ENUM('원룸', '투룸+', '오피스텔', '빌라', '아파트')")
  private ProductType productType;

// TODO: region FK 불러오기

  @Column(nullable = false, length = 50)
  private String productAddress;

  @Column(nullable = false)
  private int productDeposit;

  @Column(nullable = false)
  private int productRent;

  @Column(nullable = false)
  private int productMaintenance;

  @Column(nullable = false, length = 200)
  private String productMaintenanceInfo;

  @Column(columnDefinition = "boolean default false")
  private boolean productIsRentSupportable;

  @Column(columnDefinition = "boolean default false")
  private boolean productIsFurnitureSupportable;

  @Column(nullable = false)
  private float productSquare;

  @Column(nullable = false)
  private int productRoom;

  @Column(nullable = false, length = 7)
  private String productOption;

  private String productAdditionalOption;

  @Column(columnDefinition = "boolean default false")
  private boolean productIsBanned;

  @Column(columnDefinition = "boolean default false")
  private boolean productIsDeleted;

  @Temporal(TemporalType.TIMESTAMP)
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss.SSS")
  @CreationTimestamp
  private Date productPostDate;

  @Temporal(TemporalType.DATE)
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  @Column(nullable = false)
  private Date productStartDate;

  @Temporal(TemporalType.DATE)
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  @Column(nullable = false)
  private Date productEndDate;

}
