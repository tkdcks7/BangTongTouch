package com.jisang.bangtong.service.product;

import com.amazonaws.services.kms.model.NotFoundException;
import com.jisang.bangtong.dto.preference.PreferenceDto;
import com.jisang.bangtong.dto.product.ProductReturnDto;
import com.jisang.bangtong.dto.product.ProductSearchDto;
import com.jisang.bangtong.dto.product.ProductUpdateDto;
import com.jisang.bangtong.dto.product.ProductUploadDto;
import com.jisang.bangtong.dto.region.RegionReturnDto;
import com.jisang.bangtong.model.interest.Interest;
import com.jisang.bangtong.model.media.Media;
import com.jisang.bangtong.model.preference.Preference;
import com.jisang.bangtong.model.product.Product;
import com.jisang.bangtong.model.region.Region;
import com.jisang.bangtong.model.user.User;
import com.jisang.bangtong.repository.interest.InterestRepository;
import com.jisang.bangtong.repository.preference.PreferenceRepository;
import com.jisang.bangtong.repository.product.ProductRepository;
import com.jisang.bangtong.repository.region.RegionRepository;
import com.jisang.bangtong.repository.user.UserRepository;
import com.jisang.bangtong.service.common.FileService;
import com.jisang.bangtong.util.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
public class ProductServiceImpl implements ProductService {

  @Autowired
  private ProductRepository productRepository;
  @Autowired
  private RegionRepository regionRepository;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private JwtUtil jwtUtil;
  @Autowired
  private FileService fileService;
  @Autowired
  private InterestRepository interestRepository;
  @Autowired
  private PreferenceRepository preferenceRepository;

  @Transactional
  @Override
  public void upload(ProductUploadDto productUploadDto, List<MultipartFile> productMedia,
      HttpServletRequest request) {

    String token = jwtUtil.getAccessToken(request);
    Long userId = jwtUtil.getUserIdFromToken(token);
    User u = userRepository.findById(userId).orElse(null);
    if (!isValidUser(u)) {
      throw new NotFoundException("매물을 업로드 하는 사용자와 정보가 다릅니다.");
    }
    Product product = getProductWhenUpload(productUploadDto, u);
    try {

      productRepository.save(product);
      List<Media> fileList = fileService.upload(fileService.getName(productMedia));
      productRepository.save(product);
      product.setProductMedia(fileList);
    } catch (IOException e) {
      throw new IllegalArgumentException("파일을 저장할 수 없습니다");
    }

  }

  @Override
  @Transactional
  public void update(ProductUpdateDto productUpdateDto, Long productId,
      HttpServletRequest request) {
    log.info("product update 시작");
    String token = jwtUtil.getAccessToken(request);
    Long userId = jwtUtil.getUserIdFromToken(token);
    User u = userRepository.findById(userId).orElse(null);
    if (!isValidUser(u, userId)) {
      throw new NotFoundException("존재하지 않은 사용자거나 매물 등록을 하지 않은 유저입니다");
    }
    Product p = productRepository.findById(productUpdateDto.getProductId()).orElse(null);
    if (!isValidProduct(p, productId)) {
      throw new IllegalArgumentException("매물 정보가 일치하지 않습니다.");
    }
    Product product = getProductWhenUpdate(productUpdateDto);
    productRepository.save(product);
  }

  @Transactional
  public ProductReturnDto getProduct(long productId) {
    Product product = productRepository.findById(productId);
    List<String> additionalOption = getAdditionalOptionList(product);
    RegionReturnDto regionReturnDto = getRegionReturnDto(product);
    return ProductReturnDto.builder().productId(product.getProductId())
        .productType(product.getProductType()).regionReturnDto(regionReturnDto)
        .productAddress(product.getProductAddress()).productDeposit(product.getProductDeposit())
        .productMaintenance(product.getProductMaintenance())
        .productMaintenanceInfo(product.getProductMaintenanceInfo())
        .productIsRentSupportable(product.isProductIsRentSupportable())
        .productIsFurnitureSupportable(product.isProductIsFurnitureSupportable())
        .productSquare(product.getProductSquare()).productRoom(product.getProductRoom())
        .productAdditionalOption(additionalOption).productOption(product.getProductOption())
        .build();
  }

  private static RegionReturnDto getRegionReturnDto(Product product) {
    Region region = product.getRegion();
    return RegionReturnDto.builder().regionId(region.getRegionId())
        .regionSido(region.getRegionSido()).regionGugun(region.getRegionGugun())
        .regionDong(region.getRegionDong()).build();
  }

  @Override
  public List<ProductReturnDto> searchList(ProductSearchDto productSearchDto,
      HttpServletRequest request) {
    List<Product> productList = productRepository.searchList(productSearchDto);
    log.info("SearchList Test {}", productList);
    List<ProductReturnDto> productReturnDtoList = new ArrayList<>();
    Set<Long> interestSet = new HashSet<>();
    boolean isLike = getInterestSet(interestSet, request);

    for (Product p : productList) {
      Long pId = p.getProductId();
      ProductReturnDto productReturnDto = ProductReturnDto.builder().productId(p.getProductId())
          .productType(p.getProductType()).regionReturnDto(getRegionReturnDto(p))
          .productAddress(p.getProductAddress()).productDeposit(p.getProductDeposit())
          .productRent(p.getProductRent()).productMaintenance(p.getProductMaintenance())
          .productMaintenanceInfo(p.getProductMaintenanceInfo())
          .productIsRentSupportable(p.isProductIsRentSupportable())
          .productIsFurnitureSupportable(p.isProductIsFurnitureSupportable())
          .productSquare(p.getProductSquare()).productRoom(p.getProductRoom())
          .productOption(p.getProductOption()).productAdditionalOption(getAdditionalOptionList(p))
          .productPostDate(p.getProductPostDate()).productStartDate(p.getProductStartDate())
          .productEndDate(p.getProductEndDate()).lat(p.getLat()).lng(p.getLng())
          .productAdditionalDetail(p.getProductAddressDetail())
          .productIsInterest(isLike && interestSet.contains(pId)).mediaList(p.getProductMedia())
          .productIsDelete(p.isProductIsDeleted()).build();
      productReturnDtoList.add(productReturnDto);
    }
    return productReturnDtoList;
  }

  private static List<String> getAdditionalOptionList(Product p) {
    String s = p.getProductAdditionalOption();
    if (s == null || s.isEmpty()) {
      return null;
    }
    return Arrays.stream(s.split(",")).toList();
  }


  @Override
  @Transactional
  public void delete(Long productId, HttpServletRequest request) {

    // 유효 매물 검증 로직
    Product product = productRepository.findById(productId).orElse(null);
    if (product == null) {
      throw new NotFoundException("삭제하려는 게시물이 없습니다");
    }

    //사용자 로직
    String token = jwtUtil.getAccessToken(request);
    Long userId = jwtUtil.getUserIdFromToken(token);
    User u = userRepository.findById(userId).orElse(null);
    if (!isValidUser(u, product.getUser().getUserId())) {
      throw new IllegalArgumentException("올바르지 않은 사용자입니다");
    }

    product.setProductIsDeleted(true);
    productRepository.save(product);
  }

  @Override
  public ProductReturnDto getRecentInterestProduct(Long userId) {
    Preference preference = preferenceRepository.findFirstByUser_UserId(userId);

    if (preference == null) {
      return null;
    }

    String regionId = preference.getRegion().getRegionId();
    Product product = productRepository.findFirstByRegion_RegionIdAndProductIsDeletedIsFalse(
        regionId);

    return getProduct(product.getProductId());
  }


  //빈 인터레스트 셋을 입력받아서 사용자에 따라 어떤 매물을 관심있어 하는지 반환하는 메서드, isLike는 살펴볼만하다는 것을 의미하고,
  //셋에는 실제 productId가 반환되어 있음.
  private boolean getInterestSet(Set<Long> interestSet, HttpServletRequest request) {
    boolean isLike = false;
    String token = jwtUtil.getAccessToken(request);
    if (token == null || token.isEmpty()) {
      return false;
    }
    try {
      Long userId = jwtUtil.getUserIdFromToken(token);
      User u = userRepository.findById(userId).orElse(null);
      if (isValidUser(u)) {
        isLike = true;
        List<Interest> interestList = interestRepository.findAllByUser_UserId(userId).orElse(null);
        if (interestList != null) {
          for (Interest interest : interestList) {
            interestSet.add(interest.getProduct().getProductId());
          }
        }
      }
    } catch (ExpiredJwtException e) {
      log.info("{}", e.getMessage());
      return false;
    }
    return isLike;
  }

  private Product getProductWhenUpdate(ProductUpdateDto productUpdateDto) {
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

    List<String> strList = productUploadDto.getProductAdditionalOption();
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < strList.size() - 1; i++) {
      String option = strList.get(i);
      sb.append(option).append(",");
    }

    sb.append(strList.get(strList.size() - 1));

    return Product.builder().productType(productUploadDto.getProductType())
        .region(regionRepository.findById(productUploadDto.getRegionId()).get()).user(u)
        .productAddress(productUploadDto.getProductAddress())
        .productDeposit(productUploadDto.getProductDeposit())
        .productRent(productUploadDto.getProductRent())
        .productMaintenance(productUploadDto.getProductMaintenance())
        .productMaintenanceInfo(productUploadDto.getProductMaintenanceInfo())
        .productSquare(productUploadDto.getProductSquare())
        .productRoom(productUploadDto.getProductRoom())
        .productOption(productUploadDto.getProductOption()).productAdditionalOption(sb.toString())
        .productAddress(productUploadDto.getProductAddress())
        .productStartDate(productUploadDto.getProductStartDate())
        .productEndDate(productUploadDto.getProductEndDate())
        .productAddressDetail(productUploadDto.getProductDetailAddress())
        .productDescription(productUploadDto.getProductDescription())
        .lat(productUploadDto.getLat()).lng(productUploadDto.getLng()).build();
  }


  @Override
  public List<ProductReturnDto> getRecentProducts(HttpServletRequest request){
    String token = jwtUtil.getAccessToken(request);
    if(token.isEmpty()){
      throw new IllegalArgumentException("토큰이 만료되었습니다.");
    }
    Long userId = jwtUtil.getUserIdFromToken(token);
    User u = userRepository.findById(userId).orElse(null);
    if(!isValidUser(u)){
      throw new NotFoundException("사용자를 찾을 수 없습니다");
    }
    Preference preference = preferenceRepository.findFirstByUser_UserId(userId);
    String regionId = preference.getRegion().getRegionId();
    log.info("getRecentProduct preference {}", preference);

    List<Product> plist= productRepository.getRecentProducts(regionId);
    List<ProductReturnDto> productReturnDtoList = new ArrayList<>();
    for(Product p : plist){
      ProductReturnDto productReturnDto = ProductReturnDto.builder()
          .productId(p.getProductId())
          .productType(p.getProductType()).regionReturnDto(getRegionReturnDto(p))
          .productAddress(p.getProductAddress()).productDeposit(p.getProductDeposit())
          .productRent(p.getProductRent()).productMaintenance(p.getProductMaintenance())
          .productMaintenanceInfo(p.getProductMaintenanceInfo())
          .productIsRentSupportable(p.isProductIsRentSupportable())
          .productIsFurnitureSupportable(p.isProductIsFurnitureSupportable())
          .productSquare(p.getProductSquare()).productRoom(p.getProductRoom())
          .productOption(p.getProductOption()).productAdditionalOption(getAdditionalOptionList(p))
          .productPostDate(p.getProductPostDate()).productStartDate(p.getProductStartDate())
          .productEndDate(p.getProductEndDate()).lat(p.getLat()).lng(p.getLng())
          .productAdditionalDetail(p.getProductAddressDetail())
          .productIsInterest(false)
          .mediaList(p.getProductMedia())
          .productIsDelete(p.isProductIsDeleted())
          .build();
      productReturnDtoList.add(productReturnDto);
    }

    return productReturnDtoList;
  }

  @Override
  public Integer getProductSize(){
    return productRepository.countProductByProductIsDeletedIsFalse();
  }

  private boolean isValidUser(User u, Long productId) {
    if (u == null) {
      return false;
    }
    if (u.getUserId().equals(productId)) {
      return true;
    } else {
      return false;
    }
  }

  private boolean isValidUser(User u) {
    if (u == null) {
      return false;
    }
    return true;
  }

  private boolean isValidProduct(Product p, Long productId) {
    if (p == null) {
      return false;
    }
    return p.getProductId() == productId;
  }
}
