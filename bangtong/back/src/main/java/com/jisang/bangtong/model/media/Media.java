package com.jisang.bangtong.model.media;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.jisang.bangtong.model.board.Board;
import com.jisang.bangtong.model.chat.Chat;
import com.jisang.bangtong.model.product.Product;
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
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Entity
@RequiredArgsConstructor
@AllArgsConstructor
public class Media {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long mediaId;

  @Column(nullable = false, length = 100)
  private String mediaPath;

  @ManyToOne
  @JoinColumn(name = "product_id", foreignKey = @ForeignKey(name = "fk_media_product"))
  @JsonProperty(access = Access.WRITE_ONLY)
  private Product product;

  @OneToOne
  @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name="fk_media_user"))
  @JsonProperty(access = Access.WRITE_ONLY)
  @JsonBackReference
  private User user;
}