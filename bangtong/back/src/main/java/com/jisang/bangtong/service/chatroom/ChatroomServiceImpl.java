package com.jisang.bangtong.service.chatroom;

import com.jisang.bangtong.dto.chat.ChatReturnDto;
import com.jisang.bangtong.dto.chatroom.ChatroomDto;
import com.jisang.bangtong.dto.chatroom.ChatroomExitDto;
import com.jisang.bangtong.dto.chatroom.ChatroomReturnDto;
import com.jisang.bangtong.model.chat.Chat;
import com.jisang.bangtong.model.chatroom.Chatroom;
import com.jisang.bangtong.model.product.Product;
import com.jisang.bangtong.model.user.User;
import com.jisang.bangtong.repository.chatroom.ChatroomRepository;
import com.jisang.bangtong.repository.product.ProductRepository;
import com.jisang.bangtong.repository.user.UserRepository;
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


  public void createChatroom(ChatroomDto roomName){
    Chatroom chatroom = new Chatroom();
    chatroom.setChatroomTitle(roomName.getTitle());
    Optional<User> maker = userRepository.findById(roomName.getMaker());
    Optional<User> participant = userRepository.findById(roomName.getParticipant());
    Optional<Product> product = productRepository.findById(roomName.getProductId());

    maker.ifPresent(chatroom::setMaker);
    participant.ifPresent(chatroom::setParticipant);
    product.ifPresent(chatroom::setProduct);
    chatroomRepository.save(chatroom);
  }

  public void exitChatroom(Long chatroomId, Long userId){
    Optional<Chatroom> chatroom = chatroomRepository.findById(chatroomId);
    if(chatroom.isPresent()){
      Chatroom chatroomGet = chatroom.get();

      if (chatroomGet.getMaker().getUserId().equals(userId)) {
        chatroomGet.setChatroomMakerIsOut(true);
      }

      if (chatroomGet.getParticipant().getUserId().equals(userId)) {
        chatroomGet.setChatRoomParticipantIsOut(true);
      }

      chatroomRepository.save(chatroomGet);
    }
  }

  @Override
  public List<ChatroomReturnDto> getChatroom(Long userId) {
    log.info("chatroomServiceImpl getChatroom 실행");
    List<Chatroom> chatrooms = chatroomRepository.getChatroom(userId).orElse(new ArrayList<>());
    List<ChatroomReturnDto> chatroomReturnDtos = new ArrayList<>();
    log.info("TestSuccess {}", chatrooms);
    for(Chatroom chatroom : chatrooms){
      ChatroomReturnDto chatroomReturnDto = new ChatroomReturnDto();
      chatroomReturnDto.setChatroomId(chatroom.getChatroomId());
      chatroomReturnDto.setProduct(chatroom.getProduct());
      chatroomReturnDto.setChatroomCreatedAt(chatroom.getChatroomCreatedAt());
      if(chatroom.getMaker().getUserId().equals(userId)){
        chatroomReturnDto.setUser(chatroom.getMaker());
      }
      if(chatroom.getParticipant().getUserId().equals(userId)){
        chatroomReturnDto.setUser(chatroom.getParticipant());
      }
      log.info("test {}", chatroomReturnDto);
      chatroomReturnDtos.add(chatroomReturnDto);
    }
    return chatroomReturnDtos;
  }

  @Override
  public List<ChatReturnDto> getChats(Long chatroomId) {
    log.info("ChatroomServiceImpl. getChats 시작");
    List<ChatReturnDto> chatReturnDtos = new ArrayList<>();
    List<Chat> ret;
    try{
      ret = chatroomRepository.getChats(chatroomId);
      log.info("TestSuccess {}", ret.size());
      for(Chat chat : ret){
        ChatReturnDto chatReturnDto = new ChatReturnDto();
        chatReturnDto.setChatContent(chat.getChatContent());
        chatReturnDto.setChatTime(chat.getChatTime());
        chatReturnDto.setReceiver(chat.getReceiver());
        chatReturnDto.setSender(chat.getSender());
        chatReturnDtos.add(chatReturnDto);
      }
    }
    catch (RuntimeException e){
        log.error(e.getMessage());
    }

    return chatReturnDtos;
  }

}
