package com.xyz.social_media_project.services;

import java.util.List;

import com.xyz.social_media_project.exceptions.UserException;
import com.xyz.social_media_project.models.User;

public interface UserService {

    public User registerUser(User user);

    public User findUserById(Integer userId) throws UserException;

    public User findUserByEmail(String email);

    public User followUser(Integer userId1, Integer userId2) throws UserException;

    public User updateUser(Integer userId, User user) throws UserException;

    public List<User> searchUser(String query);

    public User findUserByJwt(String jwt);

}
