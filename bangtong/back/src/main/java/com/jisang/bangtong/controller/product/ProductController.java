package com.jisang.bangtong.controller.product;

import com.jisang.bangtong.dto.common.ResponseDto;
import com.jisang.bangtong.dto.product.ProductReturnDto;
import com.jisang.bangtong.dto.product.ProductSearchDto;
import com.jisang.bangtong.dto.product.ProductUpdateDto;
import com.jisang.bangtong.dto.product.ProductUploadDto;
import com.jisang.bangtong.model.product.Product;
import com.jisang.bangtong.model.product.ProductType;
import com.jisang.bangtong.service.product.ProductService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.sql.Date;
import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
  @PostMapping(value="/upload")
  public ResponseDto<Void> upload(@RequestPart @Valid ProductUploadDto productUploadDto, @RequestPart(required = false) List<MultipartFile> productMedia, HttpServletRequest request) {
    log.info("product upload 실행 {}", productUploadDto);
    productService.upload(productUploadDto, productMedia, request);
    return new ResponseDto<>(SUCCESS);
  }

  @PutMapping("/modify/{productId}")
  public ResponseDto<Void> modify(@RequestBody @Valid ProductUpdateDto productUpdateDto, HttpServletRequest request, @PathVariable Long productId) {
    log.info("modify 실행 {}", productUpdateDto);
    productService.update(productUpdateDto, productId ,request);
    return new ResponseDto<>(SUCCESS);
  }

  //매물 조회
  @GetMapping("/{productId}")
  public ResponseDto<ProductReturnDto> getProduct(@PathVariable("productId") Long productId) {
    ProductReturnDto product = productService.getProduct(productId);
    return new ResponseDto<>(SUCCESS, product);
  }

  @PutMapping("/delete/{productId}")
  public ResponseDto<Void> delete(@PathVariable("productId") Long productId, HttpServletRequest request) {
    productService.delete(productId, request);
    return new ResponseDto<>(SUCCESS);
  }

  @PostMapping("/search")
  public ResponseDto<List<ProductReturnDto>> search(@RequestBody ProductSearchDto productSearchDto, HttpServletRequest request){
    List<ProductReturnDto> searchList = productService.searchList(productSearchDto, request);
    return new ResponseDto<>(SUCCESS, searchList);
  }
}

