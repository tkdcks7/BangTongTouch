package com.jisang.bangtong.model.interest;

import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.jisang.bangtong.model.product.Product;
import com.jisang.bangtong.model.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class Interest {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long interest_id;

  @ManyToOne
  @JoinColumn(name="user_id", foreignKey = @ForeignKey(name="fk_interest_user"), nullable = false)
  private User user;

  @OneToOne
  @JoinColumn(name="product_id", foreignKey = @ForeignKey(name = "fk_interest_product"), nullable = false)
  private Product product;
}
