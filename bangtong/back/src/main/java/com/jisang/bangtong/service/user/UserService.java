package com.jisang.bangtong.service.user;

import com.jisang.bangtong.dto.user.ProfileDto;
import com.jisang.bangtong.dto.user.UserDto;
import com.jisang.bangtong.model.user.User;
import com.jisang.bangtong.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

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

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    public ProfileDto updateProfile(ProfileDto profileDto) {
        User user = userRepository.findById(profileDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setUserNickname(profileDto.getUserNickname());
        user.setMediaPath(profileDto.getMediaPath());
        User updatedUser = userRepository.save(user);
        ProfileDto proFileDto = new ProfileDto();
        proFileDto.setUserNickname(updatedUser.getUserNickname());
        proFileDto.setUserId(updatedUser.getUserId());
        proFileDto.setMediaPath(updatedUser);
        return new ProfileDto(updatedUser);
    }

    public ProfileDto getUserProfile(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        ProfileDto profileDto = new ProfileDto(updatedUser);
        profileDto.setUserId(profileDto.getUserId());
        profileDto.setMediaPath(profileDto.getMediaPath());
        profileDto.setUserNickname(profileDto.getUserNickname());
        return profileDto;
    }


    public UserDto getUserInfo(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return new UserDto(user);
    }


    public UserDto updateUser(UserDto userDto) {
        Optional<User> user = userRepository.findById((userDto.getUserId()));
        user.setUserPhone(updateUserDto.getPhone());
        user.setUserPassword(updateUserDto.getPassword());
    }
}
