package com.jisang.bangtong.model.media;

import com.jisang.bangtong.model.product.Product;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Data
@Entity
public class Media {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Long mediaId;

  @Column(nullable = false, length=100)
  String mediaPath;
}
