package com.jisang.bangtong.controller.user;

import com.jisang.bangtong.dto.user.ProfileDto;
import com.jisang.bangtong.dto.user.UserDto;
import com.jisang.bangtong.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    @Autowired
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody UserDto userDto) {
        userService.register(userDto);
        return null;
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable("userId") Long userId) {
        userService.deleteUser(userId);
        return null;
    }

    @GetMapping("/profile/{userId}")
    public ResponseEntity<ProfileDto> getUserProfile(@PathVariable("userID") Long userId) {
        ProfileDto profileDto = userService.getUserProfile(userId);
        return null;
    }

    @PutMapping("/profile")
    public ResponseEntity<ProfileDto> updateProfile(@RequestBody ProfileDto profileDto) {
        ProfileDto updatedProfile = userService.updateProfile(profileDto);
        return ResponseEntity.ok(updatedProfile);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUserInfo(@PathVariable("userId") Long userId) {
        UserDto userDto = userService.getUserInfo(userId);
        return null;
    }

    @PutMapping("/modify/{userId}")
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDto) {
        UserDto updateUser = userService.updateUser(userDto);
        return null;
    }
}