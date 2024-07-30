package com.jisang.bangtong.model.media;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.jisang.bangtong.model.board.Board;
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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

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

  @ManyToOne // Board와의 Many-to-One 관계 설정
  @JoinColumn(name = "board_id", foreignKey = @ForeignKey(name = "fk_media_board")) // board_id를 외래 키로 설정
  @JsonProperty(access = Access.WRITE_ONLY)
  private Board board; // Board 참조 추가

  @Override
  public String toString()
  {
    return "";
  }
//  @ManyToOne // Product와의 Many-to-One 관계
//  @JoinColumn(name = "product_id") // nullable을 true로 설정
//  private Product product;
//
//  @OneToOne
//  @JoinColumn(name="user_id")
//  private User user;
}
