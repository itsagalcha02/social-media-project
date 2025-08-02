package com.xyz.social_media_project.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.xyz.social_media_project.Repository.UserRepository;
import com.xyz.social_media_project.exceptions.UserException;
import com.xyz.social_media_project.models.User;
import com.xyz.social_media_project.services.UserService;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class UserController {

	@Autowired
	UserRepository userRepository;

	@Autowired
	UserService userService;

	@GetMapping("/api/users")
	public List<User> getUsers() {

		List<User> users = userRepository.findAll();

		return users;
	}

	@GetMapping("/api/users/{userId}")
	public User getUserById(@PathVariable("userId") Integer id) throws UserException {

		User userById = userService.findUserById(id);
		return userById;
	}

	@PutMapping("/api/users")
	public User updateUser(@RequestBody User user, @RequestHeader("Authorization") String jwt) throws UserException {

		User reqUser = userService.findUserByJwt(jwt);
		User updatedUser = userService.updateUser(reqUser.getId(), user);
		return updatedUser;
	}

	@PutMapping("/api/users/follow/{userId2}")
	public User followUserHandler(@RequestHeader("Authorization") String jwt, @PathVariable Integer userId2)
			throws UserException {
				User reqUser = userService.findUserByJwt(jwt);
		User user = userService.followUser(reqUser.getId(), userId2);
		return user;
	}

	@GetMapping("/api/users/search")
	public List<User> searchUser(@RequestParam("query") String query) {
		List<User> users = userService.searchUser(query);
		return users;
	}

	@GetMapping("/api/users/profile")
	public User getUserFromToken(@RequestHeader("Authorization") String jwt) {

		User user = userService.findUserByJwt(jwt);
		user.setPassword(null);
		return user;
	}

}
