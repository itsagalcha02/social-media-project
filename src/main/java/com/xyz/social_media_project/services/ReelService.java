package com.xyz.social_media_project.services;

import java.util.List;

import com.xyz.social_media_project.models.Reels;
import com.xyz.social_media_project.models.User;

public interface ReelService {

    public Reels createReel(Reels reel, User user);

    public List<Reels> findAllReels();

    public List<Reels> findUsersReel(Integer userId) throws Exception;
}
