package com.xyz.social_media_project.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xyz.social_media_project.Repository.StoryRepository;
import com.xyz.social_media_project.models.Story;
import com.xyz.social_media_project.models.User;

@Service
public class StoryServiceImpl implements StoryService {

    @Autowired
    private StoryRepository storyRepository;

    @Autowired
    private UserService userService;

    @Override
    public Story createStory(Story story, User user) {

        Story createdStory = new Story();
        createdStory.setCaption(story.getCaption());
        createdStory.setImage(story.getImage());
        createdStory.setTimeStamp(LocalDateTime.now());
        createdStory.setUser(user);

        return storyRepository.save(createdStory);
    }

    @Override
    public List<Story> findStoryByUserId(Integer userId) throws Exception {

        User user = userService.findUserById(userId);

        return storyRepository.findByUserId(userId);
    }
}
