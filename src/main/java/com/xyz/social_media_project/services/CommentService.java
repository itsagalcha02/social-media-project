package com.xyz.social_media_project.services;

import com.xyz.social_media_project.models.Comment;

public interface CommentService {

    public Comment createComment(Comment comment, Integer postId, Integer userId) throws Exception;

    public Comment findCommentById(Integer commentId) throws Exception;

    public Comment likeComment(Integer commentId, Integer userId) throws Exception;
}
