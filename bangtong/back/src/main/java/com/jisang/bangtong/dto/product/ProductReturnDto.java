package com.jisang.bangtong.dto.product;

import com.jisang.bangtong.model.media.Media;
import com.jisang.bangtong.model.product.Product;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class ProductReturnDto {

  Product product;
  List<Media> mediaList;
}
