package com.xyz.social_media_project.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.xyz.social_media_project.models.Chat;
import com.xyz.social_media_project.models.Message;
import com.xyz.social_media_project.models.User;
import com.xyz.social_media_project.services.MessageService;
import com.xyz.social_media_project.services.UserService;

@RestController
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @PostMapping("/api/messages/chat/{chatId}")
    public Message createMessage(@RequestBody Message req, @RequestHeader("Authorization") String jwt,
            @PathVariable Integer chatId) throws Exception {

        User reqUser = userService.findUserByJwt(jwt);
        Message message = messageService.createMessage(reqUser, chatId, req);

        return message;
    }

    @GetMapping("/api/messages/chat/{chatId}")
    public List<Message> findChatsMessage(@RequestHeader("Authorization") String jwt,
            @PathVariable Integer chatId) throws Exception {

        User reqUser = userService.findUserByJwt(jwt);
        List<Message> messages = messageService.findChatsMessages(chatId);

        return messages;
    }
}
