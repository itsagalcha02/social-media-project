package com.xyz.social_media_project.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.xyz.social_media_project.models.Reels;

public interface ReelsRepository extends JpaRepository<Reels, Integer> {

    public List<Reels> findByUserId(Integer userId);
}
