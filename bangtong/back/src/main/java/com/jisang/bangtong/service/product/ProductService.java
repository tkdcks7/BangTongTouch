package com.jisang.bangtong.service.product;

import com.jisang.bangtong.dto.product.ProductReturnDto;
import com.jisang.bangtong.dto.product.ProductSearchDto;
import com.jisang.bangtong.dto.product.ProductUpdateDto;
import com.jisang.bangtong.dto.product.ProductUploadDto;
import com.jisang.bangtong.model.product.Product;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface ProductService {

  void upload(ProductUploadDto productUploadDto, List<MultipartFile> productMedia,
      HttpServletRequest request);

  void update(ProductUpdateDto product, Long productId, HttpServletRequest request);

  ProductReturnDto getProduct(long productId);

  List<ProductReturnDto> searchList(ProductSearchDto productSearchDto, HttpServletRequest request);

  void delete(Long productId, HttpServletRequest request);

  ProductReturnDto getRecentInterestProduct(Long userId);
  
}