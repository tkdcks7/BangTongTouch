package com.jisang.bangtong.service.product;

import com.jisang.bangtong.dto.product.ProductSearchDto;
import com.jisang.bangtong.dto.product.ProductUpdateDto;
import com.jisang.bangtong.dto.product.ProductUploadDto;
import com.jisang.bangtong.model.product.Product;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface ProductService {

  void upload(ProductUploadDto product, List<MultipartFile> productMedia);
  void update(Product product);
  Product getProduct(long productId);
  List<Product> searchList(ProductSearchDto productSearchDto);
}
