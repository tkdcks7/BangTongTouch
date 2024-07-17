package com.jisang.bangtong.controller.product;

import com.jisang.bangtong.dto.common.ResponseDto;
import com.jisang.bangtong.service.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
  public ResponseEntity<ResponseDto<Void>> upload() {
    return ResponseEntity.ok(ResponseDto.res(SUCCESS));
  }

}
