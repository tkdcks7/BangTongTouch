package com.jisang.bangtong.service.product;

import com.jisang.bangtong.dto.product.ProductSearchDto;
import com.jisang.bangtong.dto.product.ProductUploadDto;
import com.jisang.bangtong.model.product.Product;
import com.jisang.bangtong.repository.product.ProductRepository;
import com.jisang.bangtong.repository.region.RegionRepository;
import com.jisang.bangtong.repository.user.UserRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService{

  @Autowired
  private ProductRepository productRepository;

  @Autowired
  private RegionRepository regionRepository;

  @Autowired
  private UserRepository userRepository;

  @Transactional
  @Override
  public void upload(ProductUploadDto productUploadDto) {
    Product product = new Product();
    product.setProductType(productUploadDto.getProductType());
    product.setRegion(regionRepository.findById(productUploadDto.getRegionId()).get());
    product.setUser(userRepository.findById(productUploadDto.getUserId()).get());
    product.setProductAddress(productUploadDto.getProductAddress());
    product.setProductDeposit(productUploadDto.getProductDeposit());
    product.setProductRent(productUploadDto.getProductRent());
    product.setProductMaintenance(productUploadDto.getProductMaintenance());
    product.setProductMaintenanceInfo(productUploadDto.getProductMaintenanceInfo());
    product.setProductSquare(productUploadDto.getProductSquare());
    product.setProductRoom(productUploadDto.getProductRoom());
    product.setProductOption(productUploadDto.getProductOption());
    product.setProductAddress(productUploadDto.getProductAddress());
    product.setProductStartDate(productUploadDto.getProductStartDate());
    product.setProductEndDate(productUploadDto.getProductEndDate());
    product.setLat(productUploadDto.getLat());
    product.setLng(productUploadDto.getLng());
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

  @Override
  public List<Product> searchList(ProductSearchDto productSearchDto) {
    return productRepository.searchList(productSearchDto);
  }


}
