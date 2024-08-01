package com.jisang.bangtong.repository.user;

import com.jisang.bangtong.model.user.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findByUserEmail(String userEmail);

  Optional<User> findUserByUserEmailAndUserProvider(String userEmail, String userProvider);

}