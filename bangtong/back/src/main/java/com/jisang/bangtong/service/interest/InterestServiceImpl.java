package com.jisang.bangtong.service.interest;

import com.jisang.bangtong.dto.Interest.InterestDto;
import com.jisang.bangtong.model.interest.Interest;
import com.jisang.bangtong.model.product.Product;
import com.jisang.bangtong.model.user.User;
import com.jisang.bangtong.repository.interest.InterestRepository;
import com.jisang.bangtong.repository.product.ProductRepository;
import com.jisang.bangtong.repository.user.UserRepository;
import java.util.List;
import java.util.Optional;
import javax.swing.text.html.Option;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class InterestServiceImpl implements InterestService{

  @Autowired
  private InterestRepository interestRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private ProductRepository productRepository;


  @Override
  public void add(InterestDto interestDto){
    log.info("add 시작");
    //log.info("interestDto: {}", interestDto);
    Interest interest = new Interest();
    
    //user 객체 얻기
    Optional<User> user = userRepository.findById(interestDto.getUserId());
    user.ifPresent(value -> log.info("user{}", value));
    
    //product 객체 얻기
    Optional<Product> product = productRepository.findById(interestDto.getProductId());
    product.ifPresent(value-> log.info("product{}", value));
    
    if(user.isPresent() &&
     product.isPresent()){
      interest.setUser(user.get());
      interest.setProduct(product.get());
      interestRepository.save(interest);
    }
    else{
      throw new RuntimeException("user or product not found");
    }
  }

  @Override
  public void delete(InterestDto interestDto) {
    log.info("delete 실행 {}", interestDto);
    interestRepository.deleteByUserIdAndProductId(interestDto.getUserId(), interestDto.getProductId());
  }

  @Override
  public Optional<List<Interest>> getList(Long userId){
    log.info("Interest ServiceImpl getList 실행");
    return interestRepository.findAllByUser_UserId(userId);
  }

}
