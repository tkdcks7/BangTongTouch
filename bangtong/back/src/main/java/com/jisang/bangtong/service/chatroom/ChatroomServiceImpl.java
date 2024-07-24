package com.jisang.bangtong.service.chatroom;

import com.jisang.bangtong.dto.chatroom.ChatroomDto;
import com.jisang.bangtong.dto.chatroom.ChatroomReturnDto;
import com.jisang.bangtong.model.chatroom.Chatroom;
import com.jisang.bangtong.model.product.Product;
import com.jisang.bangtong.model.user.User;
import com.jisang.bangtong.repository.chatroom.ChatroomRepository;
import com.jisang.bangtong.repository.product.ProductRepository;
import com.jisang.bangtong.repository.user.UserRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatroomServiceImpl implements ChatroomService {

  @Autowired
  private ChatroomRepository chatroomRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private ProductRepository productRepository;


  public void createChatroom(ChatroomDto roomName){
    Chatroom chatroom = new Chatroom();
    chatroom.setChatroomTitle(roomName.getTitle());
    Optional<User> user1 = userRepository.findById(roomName.getUser1Id());
    Optional<User> user2 = userRepository.findById(roomName.getUser2Id());
    Optional<Product> product = productRepository.findById(roomName.getProductId());

    user1.ifPresent(chatroom::setUser1);
    user2.ifPresent(chatroom::setUser2);
    product.ifPresent(chatroom::setProduct);
    chatroomRepository.save(chatroom);
  }

  public void endChatroom(Long chatroomIId){
    Optional<Chatroom> chatroom = chatroomRepository.findById(chatroomIId);
    if(chatroom.isPresent()){
      Chatroom chatroomGet = chatroom.get();
      chatroomGet.setChatrootIsEnded(true);
      chatroomRepository.save(chatroom.get());
    }
  }

  @Override
  public List<ChatroomReturnDto> getChatroom(Long userId) {
    Optional<List<Chatroom>> chatrooms = chatroomRepository.getChatroom(userId);
    List<ChatroomReturnDto> chatroomReturnDtos = new ArrayList<>();
    for(Chatroom chatroom : chatrooms.get()){
      ChatroomReturnDto chatroomReturnDto = new ChatroomReturnDto();
      chatroomReturnDto.setChatroomId(chatroom.getChatroomId());
      chatroomReturnDto.setProduct(chatroom.getProduct());
      chatroomReturnDto.setChatroomCreatedAt(chatroom.getChatroomCreatedAt());
      if(chatroom.getUser1().getUserId().equals(userId)){
        chatroomReturnDto.setUser(chatroom.getUser1());
      }
      if(chatroom.getUser2().getUserId().equals(userId)){
        chatroomReturnDto.setUser(chatroom.getUser2());
      }
      chatroomReturnDtos.add(chatroomReturnDto);
    }
    return chatroomReturnDtos;
  }

}
