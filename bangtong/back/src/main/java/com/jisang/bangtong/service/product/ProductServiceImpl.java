package com.jisang.bangtong.service.product;

import com.jisang.bangtong.dto.product.ProductSearchDto;
import com.jisang.bangtong.dto.product.ProductUploadDto;
import com.jisang.bangtong.model.media.Media;
import com.jisang.bangtong.model.product.Product;
import com.jisang.bangtong.repository.file.FileRepository;
import com.jisang.bangtong.repository.product.ProductRepository;
import com.jisang.bangtong.repository.region.RegionRepository;
import com.jisang.bangtong.repository.user.UserRepository;
import com.jisang.bangtong.service.common.FileService;
import jakarta.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
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

  @Autowired
  private FileService fileService;

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

    try {
      List<Media> fileList= fileService.upload(productUploadDto.getMediaList());
      product.setProductMedia(fileList);
    } catch (IOException e) {
      throw new RuntimeException("파일을 저장할 수 없습니다");
    }

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
