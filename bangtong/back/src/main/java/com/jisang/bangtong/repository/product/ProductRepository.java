package com.jisang.bangtong.repository.product;

import com.jisang.bangtong.model.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface ProductRepository extends JpaRepository<Product, Long>, ProductRepositoryCustom {
  Product findById(long id);
}