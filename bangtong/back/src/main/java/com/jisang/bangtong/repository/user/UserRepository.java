package com.jisang.bangtong.repository.user;

import com.jisang.bangtong.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
<<<<<<< Updated upstream
public interface UserRepository extends JpaRepository<User,Long> {
=======
public interface UserRepository extends JpaRepository<User, Integer> {
>>>>>>> Stashed changes

}
