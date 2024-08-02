package com.jisang.bangtong.controller.product;

import com.jisang.bangtong.dto.common.ResponseDto;
import com.jisang.bangtong.dto.product.ProductSearchDto;
import com.jisang.bangtong.dto.product.ProductUpdateDto;
import com.jisang.bangtong.dto.product.ProductUploadDto;
import com.jisang.bangtong.model.media.Media;
import com.jisang.bangtong.model.product.Product;
import com.jisang.bangtong.model.product.ProductType;
import com.jisang.bangtong.service.common.FileService;
import com.jisang.bangtong.service.product.ProductService;
import com.jisang.bangtong.service.product.ProductServiceImpl;
import com.jisang.bangtong.service.region.RegionService;
import com.jisang.bangtong.service.user.UserService;
import java.io.IOException;
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
  public ResponseDto<Void> upload(@RequestPart Map<String, String> productUploadDto, @RequestPart(required = false) List<MultipartFile> productMedia) {
    log.info("product upload 실행 {}", productUploadDto);
    log.info("{}", productMedia);
    ProductUploadDto updateDto = new ProductUploadDto();
    setUpdateDto(productUploadDto, updateDto);

    productService.upload(updateDto, productMedia);

    return new ResponseDto<>(SUCCESS);
  }

  private void setUpdateDto(Map<String, String> productUploadDto, ProductUploadDto updateDto) {
    updateDto.setLng(Double.parseDouble(productUploadDto.get("lng")));
    updateDto.setLat(Double.parseDouble(productUploadDto.get("lat")));
    updateDto.setProductType(ProductType.valueOf(productUploadDto.get("productType")));
    updateDto.setRegionId(productUploadDto.get("regionId"));
    updateDto.setUserId(Long.parseLong(productUploadDto.get("userId")));
    updateDto.setProductAddress(productUploadDto.get("productAddress"));
    updateDto.setProductDeposit(Integer.parseInt(productUploadDto.get("productDeposit")));
    updateDto.setProductIsRentSupportable(Boolean.parseBoolean(productUploadDto.get("productIsRentSupportable")));
    updateDto.setProductIsFurnitureSupportable(Boolean.parseBoolean(productUploadDto.get("productIsFurnitureSupportable")));
    updateDto.setProductSquare(Float.parseFloat(productUploadDto.get("productSquare")));
    updateDto.setProductRoom(Integer.parseInt(productUploadDto.get("productRoom")));
    updateDto.setProductOption(productUploadDto.get("productOption"));
    updateDto.setProductStartDate(Date.valueOf(productUploadDto.get("productStartDate")));
    updateDto.setProductEndDate(Date.valueOf(productUploadDto.get("productEndDate")));
    updateDto.setProductMaintenanceInfo(productUploadDto.get("productMaintenanceInfo"));
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

  @PostMapping("/search")
  public ResponseDto<List<Product>> search(@RequestBody ProductSearchDto productSearchDto){
    List<Product> searchList = productService.searchList(productSearchDto);
    return new ResponseDto<>(SUCCESS, searchList);
  }
}
