package com.xyz.social_media_project.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.xyz.social_media_project.models.Reels;
import com.xyz.social_media_project.models.User;
import com.xyz.social_media_project.services.ReelService;
import com.xyz.social_media_project.services.UserService;

@RestController
public class ReelContoller {

    @Autowired
    private ReelService reelService;

    @Autowired
    private UserService userService;

    @PostMapping("/api/reels/user")
    public Reels createReels(@RequestBody Reels reel, @RequestHeader("Authorization") String jwt) {

        User reqUser = userService.findUserByJwt(jwt);
        Reels createdReel = reelService.createReel(reel, reqUser);

        return createdReel;
    }

    @GetMapping("/api/reels")
    public List<Reels> findAllReels() {

        List<Reels> reels = reelService.findAllReels();
        return reels;
    }

    @GetMapping("/api/reels/user/{userId}")
    public List<Reels> findUsersReel(@PathVariable Integer userId) throws Exception {

        List<Reels> userReels = reelService.findUsersReel(userId);
        return userReels;
    }
}
