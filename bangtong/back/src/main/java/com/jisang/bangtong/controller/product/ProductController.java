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
  public ResponseDto<Void> upload(@RequestPart Map<String, Object> productUploadDto, @RequestPart(required = false) List<MultipartFile> productMedia, HttpServletRequest request) {
    log.info("product upload 실행 {}", productUploadDto);
    log.info("{}", productMedia);
    ProductUploadDto updateDto = setUploadDto(productUploadDto);
    log.info("{}", updateDto);
    //productService.upload(updateDto, productMedia, request);
    return new ResponseDto<>(SUCCESS);
  }

  @PutMapping("/modify/{productId}")
  public ResponseDto<Void> modify(@RequestBody ProductUpdateDto productUpdateDto, HttpServletRequest request) {
    log.info("modify 실행 {}", productUpdateDto);
    productService.update(productUpdateDto, request);
    return new ResponseDto<>(SUCCESS);
  }

  //매물 조회
  @GetMapping("/{productId}")
  public ResponseDto<ProductReturnDto> getProduct(@PathVariable("productId") Long productId) {
    ProductReturnDto product = productService.getProduct(productId);
    return new ResponseDto<>(SUCCESS, product);
  }

  @PutMapping("/delete/{productId}")
  public ResponseDto<Void> delete(@PathVariable("productId") Long productId) {
    productService.delete(productId);
    return new ResponseDto<>(SUCCESS);
  }

  @PostMapping("/search")
  public ResponseDto<List<ProductReturnDto>> search(@RequestBody ProductSearchDto productSearchDto){
    List<ProductReturnDto> searchList = productService.searchList(productSearchDto);
    return new ResponseDto<>(SUCCESS, searchList);
  }

  private ProductUploadDto setUploadDto(Map<String, Object> productUploadDto) {
    ProductUploadDto uploadDto = new ProductUploadDto();
    List<String> strList = (List<String>)productUploadDto.get("productAdditionalOption");
    StringBuilder sb = new StringBuilder();
    for(int i=0; i<strList.size()-1; i++){
      sb.append(strList.get(i)).append(",");
    }
    sb.append(strList.get(strList.size()-1));

    uploadDto.setProductType(ProductType.valueOf(toStr(productUploadDto.get("productType"))));
    uploadDto.setRegionId(toStr(productUploadDto.get("regionId")));
    uploadDto.setProductAddress(toStr(productUploadDto.get("productAddress")));
    uploadDto.setProductDeposit(Integer.parseInt(toStr(productUploadDto.get("productDeposit"))));
    uploadDto.setProductMaintenance(Integer.parseInt(toStr(productUploadDto.get("productMaintenance"))));
    uploadDto.setProductMaintenanceInfo(toStr(productUploadDto.get("productMaintenanceInfo")));
    uploadDto.setProductIsRentSupportable(Boolean.parseBoolean(toStr(productUploadDto.get("productIsRentSupportable"))));
    uploadDto.setProductIsFurnitureSupportable(Boolean.parseBoolean(toStr(productUploadDto.get("productIsFurnitureSupportable"))));
    uploadDto.setProductSquare(Float.parseFloat(toStr(productUploadDto.get("productSquare"))));
    uploadDto.setProductRoom(Integer.parseInt(toStr(productUploadDto.get("productRoom"))));
    uploadDto.setProductOption(Integer.parseInt(toStr(productUploadDto.get("productOption"))));
    uploadDto.setProductAdditionalOption(sb.toString());
    uploadDto.setLng(Double.parseDouble(toStr(productUploadDto.get("lng"))));
    uploadDto.setLat(Double.parseDouble(toStr(productUploadDto.get("lat"))));
    uploadDto.setProductStartDate(Date.valueOf(toStr(productUploadDto.get("productStartDate"))));
    uploadDto.setProductEndDate(Date.valueOf(toStr(productUploadDto.get("productEndDate"))));
    uploadDto.setProductDetailAddress(toStr(productUploadDto.get("productDetailAddress")));
    return uploadDto;
  }

  private String toStr(Object obj){
    return String.valueOf(obj);
  }
}
