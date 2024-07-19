package com.jisang.bangtong.controller.product;

import com.jisang.bangtong.dto.common.ResponseDto;
import com.jisang.bangtong.dto.product.ProductUpdateDto;
import com.jisang.bangtong.model.product.Product;
import com.jisang.bangtong.service.product.ProductService;
import com.jisang.bangtong.service.product.ProductServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/products")
public class ProductController {

  private final String SUCCESS = "success";
  private final String SERVER_ERROR = "server_error";
  private final String CLIENT_ERROR = "client_error";

  @Autowired
  private ProductService productService;
  //  TODO: MediaService 생성 후 연결

  //  매물 업로드
  //  TODO: Multipart 처리
  @PostMapping("/upload")
  public ResponseDto<Void> upload(@RequestBody Product product) {
    log.info("product upload 실행 {}", product);
    productService.upload(product);

    return new ResponseDto<>(SUCCESS);
  }

  @PutMapping("/modify/{productId}")
  public ResponseDto<Void> modify(@RequestBody ProductUpdateDto productUpdateDto) {

    log.info("modify 실행 {}", productUpdateDto);

    Product product = productService.getProduct(productUpdateDto.getProductId());

    //setter 설정
    product.setProductId(productUpdateDto.getProductId());
    product.setProductDeposit(productUpdateDto.getProductDeposit());
    product.setProductMaintenance(productUpdateDto.getProductMaintenance());
    product.setProductIsRentSupportable(productUpdateDto.getProductIsRentSupportable());
    product.setProductIsFurnitureSupportable(productUpdateDto.getProductIsFurnitureSupportable());
    product.setProductOption(productUpdateDto.getProductOption());
    product.setProductAdditionalOption(productUpdateDto.getProductAdditionalOption());
    product.setProductStartDate(productUpdateDto.getProductStartDate());
    product.setProductEndDate(productUpdateDto.getProductEndDate());

    productService.update(product);
    return new ResponseDto<>(SUCCESS);
  }

  //매물 조회
  @GetMapping("/{productId}")
  public ResponseDto<Product> getProduct(@PathVariable("productId") Long productId) {
    Product product = productService.getProduct(productId);
    return new ResponseDto<>(SUCCESS, product);
  }

  @PutMapping("/delete/{productId}")
  public ResponseDto<Void> delete(@PathVariable("productId") Long productId) {
    Product product = productService.getProduct(productId);
    product.setProductIsDeleted(true);
    productService.update(product);
    return new ResponseDto<>(SUCCESS);
  }
}
