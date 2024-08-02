package com.jisang.bangtong.repository.chat;

import com.jisang.bangtong.model.chat.Chat;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ChatJdbcRepositoryImpl implements ChatJdbcRepository{

  @Autowired
  private JdbcTemplate jdbcTemplate;

  public void saveAllListChats(List<Chat> messages){
    String sql = "INSERT INTO chat (`sender_id`, `chat_content`, `chat_time`, `chatroom_id`, `receiver_id`) VALUES (?, ?, ?, ?, ?)";

    jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

      @Override
      public void setValues(PreparedStatement ps, int i) throws SQLException {
        Chat chat = messages.get(i);
        Chat message = messages.get(i);
        ps.setString(1, String.valueOf(message.getSender().getUserId()));
        ps.setString(2, String.valueOf(chat.getChatContent()));
        ps.setString(3, String.valueOf(new Timestamp(message.getChatTime().getTime())));
        ps.setString(4, String.valueOf(chat.getChatRoom().getChatroomId()));
        ps.setString(5, String.valueOf(chat.getReceiver().getUserId()));
      }

      @Override
      public int getBatchSize() {
        return messages.size();
      }
    });

  }

}
