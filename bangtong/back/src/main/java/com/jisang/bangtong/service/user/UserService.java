package com.jisang.bangtong.service.user;

import com.jisang.bangtong.dto.user.UserDto;
import com.jisang.bangtong.model.user.User;
import com.jisang.bangtong.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public void register(UserDto userDto) {
        User user = new User();
        user.setUserName(userDto.getName());
        user.setUserEmail(userDto.getEmail());
        user.setUserBirthYear(userDto.getBirthYear());
        user.setUserPhone(userDto.getPhone());
        user.setUserSalt("0");
        user.setUserNickname(userDto.getNickname());
        user.setUserGender(userDto.getGender());
        user.setUserPassword(userDto.getPassword());

        userRepository.save(user);
    }
}
