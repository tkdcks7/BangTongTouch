package com.jisang.bangtong.model.product;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.jisang.bangtong.model.region.Region;
import com.jisang.bangtong.model.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
  @OneToOne
  @JoinColumn(name = "regionId", foreignKey = @ForeignKey(name = "fk_product_region"), nullable = false)
  private Region region;

  @ManyToOne
  @JoinColumn(name="userId", foreignKey = @ForeignKey(name="fk_product_user"), nullable = false)
  private User user;

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

  @Column(nullable=false)
  private double lat; // 위도

  @Column(nullable = false)
  private double lng; //경도

  @Column(nullable=false)
  private double productScore=0.0;
}
