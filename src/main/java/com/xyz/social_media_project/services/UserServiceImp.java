package com.xyz.social_media_project.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xyz.social_media_project.Repository.UserRepository;
import com.xyz.social_media_project.configuration.JwtProvider;
import com.xyz.social_media_project.exceptions.UserException;
import com.xyz.social_media_project.models.User;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public User registerUser(User user) {

        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setPassword(user.getPassword());

        User savedUser = userRepository.save(newUser);
        return savedUser;
    }

    @Override
    public User findUserById(Integer userId) throws UserException {

        Optional<User> user = userRepository.findById(userId);

        if (user.isPresent()) {
            return user.get();
        }
        throw new UserException("user not found with " + userId);

    }

    @Override
    public User findUserByEmail(String email) {

        User user = userRepository.findUserByEmail(email);
        return user;
    }

    @Override
    public User followUser(Integer reqUserId, Integer userId2) throws UserException {

        User reqUser = findUserById(reqUserId);
        User user2 = findUserById(userId2);

        user2.getFollowers().add(reqUser.getId());
        reqUser.getFollowings().add(user2.getId());

        userRepository.save(reqUser);
        userRepository.save(user2);

        return reqUser;
    }

    @Override
    public User updateUser(Integer userId, User user) throws UserException {

        Optional<User> user1 = userRepository.findById(userId);

        if (user1.isEmpty()) {
            throw new UserException("no user found with " + userId);
        }

        User oldUser = user1.get();

        if (user.getFirstName() != null) {
            oldUser.setFirstName(user.getFirstName());
        }
        if (user.getLastName() != null) {
            oldUser.setLastName(user.getLastName());
        }
        if (user.getEmail() != null) {
            oldUser.setEmail(user.getEmail());
        }
        if (user.getGender() != null) {
            oldUser.setGender(user.getGender());
        }

        User updatUser = userRepository.save(oldUser);

        return updatUser;
    }

    @Override
    public List<User> searchUser(String query) {
        return userRepository.searchUser(query);
    }

    @Override
    public User findUserByJwt(String jwt) {

        String email = JwtProvider.getEmailFromJwtToken(jwt);
        User user = userRepository.findUserByEmail(email);
        return user;
    }

}