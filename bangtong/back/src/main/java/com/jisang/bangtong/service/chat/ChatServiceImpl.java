package com.jisang.bangtong.service.chat;

import com.jisang.bangtong.model.chat.Chat;
import com.jisang.bangtong.model.chatroom.Chatroom;
import com.jisang.bangtong.model.media.Media;
import com.jisang.bangtong.model.user.User;
import com.jisang.bangtong.repository.chat.ChatRepository;
import com.jisang.bangtong.repository.chatroom.ChatroomRepository;
import com.jisang.bangtong.repository.user.UserRepository;
import com.jisang.bangtong.service.common.FileService;
import jakarta.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
public class ChatServiceImpl implements ChatService {

  @Autowired
  ChatRepository chatRepository;

  @Autowired
  UserRepository userRepository;

  @Autowired
  ChatroomRepository chatroomRepository;

  @Autowired
  FileService fileService;

  List<Chat> chats = new ArrayList<>();

  @Override
  @Transactional
  public Chat send(Map<String, Object> chatDto, List<MultipartFile> files) {
    log.info("ChatService Impl {}", chatDto);

    Chat chat = new Chat();
    //chat 내용 가져오기
    chat.setChatContent(chatDto.get("chatContent").toString());

    //사용자 가져오기
    Long receiverId = Long.parseLong(chatDto.get("receiver").toString());
    Long senderId = Long.parseLong(chatDto.get("sender").toString());
    User receiver = userRepository.findById(receiverId).orElse(null);
    User sender = userRepository.findById(senderId).orElse(null);
    log.info("{}", chat.getChatTime());
    if(receiver == null || sender == null) {
      throw new RuntimeException("ChatServiceImpl send receiver and sender is null");
    }else{
      chat.setReceiver(receiver);
    }
    if(files != null && !files.isEmpty()) {
      try {
        List<Media> fileList= fileService.upload(files);
        chat.setMediaList(fileList);
      } catch (IOException e) {
        throw new RuntimeException("파일을 저장할 수 없습니다");
      }
    }
    //chatroom 가져오기
    Long chatRoomId = Long.parseLong(chatDto.get("chatRoom").toString());
    Chatroom chatroom = chatroomRepository.findById(chatRoomId).orElse(null);
    
    if(chatroom == null) {
      throw new RuntimeException("ChatServiceImpl chatroom is null");
    }else{  //chatroom이 형성되어 있으면
      chat.setChatRoom(chatroom);
    }
    chats.add(chat);

    if(chats.size() > 10){
      chatRepository.saveAllListChats(chats);
      chats.clear();
    }
    return chat;
  }

  @Override
  public List<Chat> getMessagesByRoom(Long roomId) {
    Optional<List<Chat>> chats = chatRepository.findByChatRoom_ChatroomId(roomId);
    if(chats.isPresent()){
      return chats.get();
    }else{
      throw new RuntimeException("chatroom not found");
    }
  }
}
