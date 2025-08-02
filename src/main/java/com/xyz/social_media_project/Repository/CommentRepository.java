package com.xyz.social_media_project.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.xyz.social_media_project.models.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

}
