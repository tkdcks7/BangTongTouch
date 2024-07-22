package com.jisang.bangtong.service.product;

import com.jisang.bangtong.dto.product.ProductUpdateDto;
import com.jisang.bangtong.model.product.Product;

public interface ProductService {

  void upload(Product product);
  void update(Product product);
  Product getProduct(long productId);

}