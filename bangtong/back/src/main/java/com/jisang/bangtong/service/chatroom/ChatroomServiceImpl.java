package com.jisang.bangtong.service.chatroom;

import com.jisang.bangtong.dto.chat.ChatReturnDto;
import com.jisang.bangtong.dto.chatroom.ChatroomDto;
import com.jisang.bangtong.dto.chatroom.ChatroomExitDto;
import com.jisang.bangtong.dto.chatroom.ChatroomReturnDto;
import com.jisang.bangtong.dto.product.ProductReturnDto;
import com.jisang.bangtong.dto.region.RegionReturnDto;
import com.jisang.bangtong.dto.user.IUser;
import com.jisang.bangtong.model.chat.Chat;
import com.jisang.bangtong.model.chatroom.Chatroom;
import com.jisang.bangtong.model.chatroom.QChatroom;
import com.jisang.bangtong.model.media.QMedia;
import com.jisang.bangtong.model.product.Product;
import com.jisang.bangtong.model.product.QProduct;
import com.jisang.bangtong.model.region.QRegion;
import com.jisang.bangtong.model.user.QUser;
import com.jisang.bangtong.model.user.User;
import com.jisang.bangtong.repository.chatroom.ChatroomRepository;
import com.jisang.bangtong.repository.product.ProductRepository;
import com.jisang.bangtong.repository.user.UserRepository;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class ChatroomServiceImpl implements ChatroomService {

  @Autowired
  private ChatroomRepository chatroomRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private ProductRepository productRepository;


  public Long createChatroom(ChatroomDto roomName){
    Chatroom chatroom = new Chatroom();
    chatroom.setChatroomTitle(roomName.getTitle());
    Optional<User> maker = userRepository.findById(roomName.getMaker());
    Optional<User> participant = userRepository.findById(roomName.getParticipant());
    Optional<Product> product = productRepository.findById(roomName.getProductId());

    maker.ifPresent(chatroom::setMaker);
    participant.ifPresent(chatroom::setParticipant);
    product.ifPresent(chatroom::setProduct);
    Chatroom chatrooms = chatroomRepository.save(chatroom);
    return chatrooms.getChatroomId();
  }

  public void exitChatroom(Long chatroomId, Long userId){
    Optional<Chatroom> chatroom = chatroomRepository.findById(chatroomId);
    if(chatroom.isPresent()){
      Chatroom chatroomGet = chatroom.get();

      if (chatroomGet.getMaker().getUserId().equals(userId)) {
        chatroomGet.setChatroomMakerIsOut(true);
      }

      if (chatroomGet.getParticipant().getUserId().equals(userId)) {
        chatroomGet.setChatroomParticipantIsOut(true);
      }

      chatroomRepository.save(chatroomGet);
    }
  }

  @Override
  public List<ChatroomReturnDto> getChatroom(Long userId) {
    log.info("chatroomServiceImpl getChatroom 실행");
    return chatroomRepository.getChatroom(userId);
  }

  @Override
  public ChatReturnDto getChats(Long chatroomId) {
    log.info("ChatroomServiceImpl. getChats 시작");
    return chatroomRepository.getChats(chatroomId);
  }

}
