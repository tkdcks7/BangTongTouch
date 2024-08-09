package com.jisang.bangtong.repository.product;

import com.jisang.bangtong.model.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long>, ProductRepositoryCustom, ProductJDBCRepository {

  Product findById(long id);

  Product findFirstByRegion_RegionIdAndProductIsDeletedIsFalse(String regionId);

  Integer countProductByProductIsDeletedIsFalse();
}