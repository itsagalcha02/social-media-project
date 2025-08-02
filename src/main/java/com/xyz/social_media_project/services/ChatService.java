package com.xyz.social_media_project.services;

import java.util.List;

import com.xyz.social_media_project.models.Chat;
import com.xyz.social_media_project.models.User;

public interface ChatService {

    public Chat createChat(User reqUser, User user);

    public Chat findChatById(Integer chatId) throws Exception;

    public List<Chat> findUsersChat(Integer userId);
}
