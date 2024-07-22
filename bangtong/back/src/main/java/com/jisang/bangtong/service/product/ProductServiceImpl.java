package com.jisang.bangtong.service.product;

import com.jisang.bangtong.model.product.Product;
import com.jisang.bangtong.repository.product.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService{

  @Autowired
  private ProductRepository productRepository;


  @Override
  public void upload(Product product) {
    productRepository.save(product);
  }

  @Override
  @Transactional
  public void update(Product product){
    productRepository.save(product);
  }

  @Override
  public Product getProduct(long productId) {
    return productRepository.findById(productId);
  }


}
