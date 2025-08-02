package com.xyz.social_media_project.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.xyz.social_media_project.Request.CreateChatRequest;
import com.xyz.social_media_project.models.Chat;
import com.xyz.social_media_project.models.User;
import com.xyz.social_media_project.services.ChatService;
import com.xyz.social_media_project.services.UserService;

@RestController
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private UserService userService;

    @PostMapping("/api/chats")
    public Chat createChat(@RequestBody CreateChatRequest req, @RequestHeader("Authorization") String jwt)
            throws Exception {

        User reqUser = userService.findUserByJwt(jwt);
        User user2 = userService.findUserById(req.getUserId());
        Chat chat = chatService.createChat(reqUser, user2);

        return chat;
    }

    @GetMapping("/api/chats")
    public List<Chat> findUsersChat(@RequestHeader("Authorization") String jwt) {

        User reqUser = userService.findUserByJwt(jwt);

        List<Chat> chats = chatService.findUsersChat(reqUser.getId());

        return chats;
    }
}
