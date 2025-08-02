package com.xyz.social_media_project.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.xyz.social_media_project.models.Message;

public interface MessageRepository extends JpaRepository<Message, Integer> {

    public List<Message> findByChatId(Integer chatId);
}
