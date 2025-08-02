package com.xyz.social_media_project.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xyz.social_media_project.Repository.ReelsRepository;
import com.xyz.social_media_project.models.Reels;
import com.xyz.social_media_project.models.User;

@Service
public class ReelsServiceImpl implements ReelService {

    @Autowired
    private ReelsRepository reelsRepository;

    @Autowired
    private UserService userService;

    @Override
    public Reels createReel(Reels reel, User user) {

        Reels createReel = new Reels();
        createReel.setTitle(reel.getTitle());
        createReel.setUser(user);
        createReel.setVideo(reel.getVideo());

        return reelsRepository.save(createReel);
    }

    @Override
    public List<Reels> findAllReels() {

        return reelsRepository.findAll();
    }

    @Override
    public List<Reels> findUsersReel(Integer userId) throws Exception {
        
        return reelsRepository.findByUserId(userId);
    }

}
