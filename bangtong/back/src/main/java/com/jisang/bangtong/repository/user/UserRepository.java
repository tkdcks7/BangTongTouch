package com.jisang.bangtong.repository.user;

import com.jisang.bangtong.model.user.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  List<User> findByUserEmail(String userEmail);

}