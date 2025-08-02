package com.xyz.social_media_project.services;

import java.util.List;

import com.xyz.social_media_project.models.Message;
import com.xyz.social_media_project.models.User;

public interface MessageService {

    public Message createMessage(User user, Integer chatId, Message req) throws Exception;

    public List<Message> findChatsMessages(Integer chatId) throws Exception;
}
