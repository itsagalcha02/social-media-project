package com.xyz.social_media_project.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.xyz.social_media_project.Response.ApiResponse;
import com.xyz.social_media_project.models.Post;
import com.xyz.social_media_project.models.User;
import com.xyz.social_media_project.services.PostService;
import com.xyz.social_media_project.services.UserService;

@RestController
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @PostMapping("/api/posts")
    public ResponseEntity<Post> createPost(@RequestBody Post post, @RequestHeader("Authorization") String jwt)
            throws Exception {

        User reqUser = userService.findUserByJwt(jwt);
        Post createdPost = postService.createNewPost(post, reqUser.getId());
        return new ResponseEntity<>(createdPost, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/api/posts/{postId}")
    public ResponseEntity<ApiResponse> deletePosts(@PathVariable Integer postId,
            @RequestHeader("Authorization") String jwt)
            throws Exception {

        User reqUser = userService.findUserByJwt(jwt);
        String message = postService.deletePost(postId, reqUser.getId());
        ApiResponse res = new ApiResponse(message, true);
        return new ResponseEntity<ApiResponse>(res, HttpStatus.OK);
    }

    @GetMapping("/api/posts/{postId}")
    public ResponseEntity<Post> findPostByIdHandler(@PathVariable Integer postId) throws Exception {
        Post post = postService.findPostByID(postId);
        return new ResponseEntity<Post>(post, HttpStatus.ACCEPTED);
    }

    @GetMapping("/api/posts/user/{userId}")
    public ResponseEntity<List<Post>> findUserPost(@PathVariable Integer userId) {
        List<Post> posts = postService.findPostByUserId(userId);
        return new ResponseEntity<List<Post>>(posts, HttpStatus.OK);
    }

    @GetMapping("/api/posts")
    public ResponseEntity<List<Post>> findAllPost() {
        List<Post> posts = postService.findAllPost();
        return new ResponseEntity<List<Post>>(posts, HttpStatus.OK);
    }

    @PutMapping("/api/posts/save/{postId}")
    public ResponseEntity<Post> savedPostHandler(@RequestHeader("Authorization") String jwt,
            @PathVariable Integer postId)
            throws Exception {

        User reqUser = userService.findUserByJwt(jwt);
        Post post = postService.savedPost(postId, reqUser.getId());
        return new ResponseEntity<Post>(post, HttpStatus.ACCEPTED);
    }

    @PutMapping("/api/posts/like/{postId}")
    public ResponseEntity<Post> likedPostHandler(@RequestHeader("Authorization") String jwt,
            @PathVariable Integer postId)
            throws Exception {

        User reqUser = userService.findUserByJwt(jwt);
        Post post = postService.likePost(postId, reqUser.getId());
        return new ResponseEntity<Post>(post, HttpStatus.ACCEPTED);
    }

}
