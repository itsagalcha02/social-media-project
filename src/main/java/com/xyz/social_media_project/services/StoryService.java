package com.xyz.social_media_project.services;

import java.util.List;

import com.xyz.social_media_project.models.Story;
import com.xyz.social_media_project.models.User;

public interface StoryService {

    public Story createStory(Story story, User user);

    public List<Story> findStoryByUserId(Integer userId) throws Exception;
}
