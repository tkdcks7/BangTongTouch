package com.jisang.bangtong.service.product;

import com.jisang.bangtong.dto.product.ProductReturnDto;
import com.jisang.bangtong.dto.product.ProductSearchDto;
import com.jisang.bangtong.dto.product.ProductUpdateDto;
import com.jisang.bangtong.dto.product.ProductUploadDto;
import com.jisang.bangtong.model.media.Media;
import com.jisang.bangtong.model.product.Product;
import com.jisang.bangtong.model.user.User;
import com.jisang.bangtong.repository.file.FileRepository;
import com.jisang.bangtong.repository.product.ProductRepository;
import com.jisang.bangtong.repository.region.RegionRepository;
import com.jisang.bangtong.repository.user.UserRepository;
import com.jisang.bangtong.service.common.FileService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
  public void upload(ProductUploadDto productUploadDto, List<MultipartFile> productMedia, HttpServletRequest request) {

    User u = new User();

    Product product = getProductWhenUpload(productUploadDto, u);
    try {
      List<Media> fileList= fileService.upload(productMedia);
      product.setProductMedia(fileList);
    } catch (IOException e) {
      throw new RuntimeException("파일을 저장할 수 없습니다");
    }
    productRepository.save(product);
  }

  @Override
  @Transactional
  public void update(ProductUpdateDto productUpdateDto, HttpServletRequest request){
    Product product = getProductWhenUpdate(productUpdateDto);
    productRepository.save(product);
  }

  @Override
  public ProductReturnDto getProduct(long productId) {
    Product product = productRepository.findById(productId);
    String addOption = product.getProductAdditionalOption();
    List<String> additionalOption = new ArrayList<>();


    return ProductReturnDto.builder()
        .productId(product.getProductId())
        .productType(product.getProductType())
        .region(product.getRegion())
        .productAddress(product.getProductAddress())
        .productDeposit(product.getProductDeposit())
        .productMaintenance(product.getProductMaintenance())
        .productMaintenanceInfo(product.getProductMaintenanceInfo())
        .productIsRentSupportable(product.isProductIsRentSupportable())
        .productIsFurnitureSupportable(product.isProductIsFurnitureSupportable())
        .productSquare(product.getProductSquare())
        .productRoom(product.getProductRoom())
        .productOption(Integer.parseInt(product.getProductOption()))
        .build();
  }

  @Override
  public List<ProductReturnDto> searchList(ProductSearchDto productSearchDto) {
    List<Product> productList= productRepository.searchList(productSearchDto);
    List<ProductReturnDto> productReturnDtoList = new ArrayList<>();
    return productReturnDtoList;
  }

  @Override
  public void delete(Long productId){
    ;
  }

  private Product getProductWhenUpdate(ProductUpdateDto productUpdateDto){
    Product product = productRepository.findById(productUpdateDto.getProductId()).orElse(null);
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
    return product;
  }

  private Product getProductWhenUpload(ProductUploadDto productUploadDto, User u) {
    return Product.builder()
        .productType(productUploadDto.getProductType())
        .region(regionRepository.findById(productUploadDto.getRegionId()).get())
        .user(u)
        .productAddress(productUploadDto.getProductAddress())
        .productDeposit(productUploadDto.getProductDeposit())
        .productRent(productUploadDto.getProductRent())
        .productMaintenance(productUploadDto.getProductMaintenance())
        .productMaintenanceInfo(productUploadDto.getProductMaintenanceInfo())
        .productSquare(productUploadDto.getProductSquare())
        .productRoom(productUploadDto.getProductRoom())
        .productOption(String.valueOf(productUploadDto.getProductOption()))
        .productAdditionalOption(productUploadDto.getProductAdditionalOption())
        .productAddress(productUploadDto.getProductAddress())
        .productStartDate(productUploadDto.getProductStartDate())
        .productEndDate(productUploadDto.getProductEndDate())
        .productAddressDetail(productUploadDto.getProductDetailAddress())
        .lat(productUploadDto.getLat())
        .lng(productUploadDto.getLng())
        .build();
  }

}
