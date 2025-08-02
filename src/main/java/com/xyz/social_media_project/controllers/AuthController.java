package com.xyz.social_media_project.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xyz.social_media_project.Repository.UserRepository;
import com.xyz.social_media_project.Request.LoginRequest;
import com.xyz.social_media_project.Response.AuthResponse;
import com.xyz.social_media_project.configuration.JwtProvider;
import com.xyz.social_media_project.models.User;
import com.xyz.social_media_project.services.CustomUserDetailService;

@RestController
@RequestMapping("/auth")
// @CrossOrigin("http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomUserDetailService customUserDetailService;

    // "/auth/signup"
    @PostMapping("/signup")
    public AuthResponse createUser(@RequestBody User user) throws Exception {

        User isExist = userRepository.findUserByEmail(user.getEmail());

        if (isExist != null) {
            throw new Exception("this email already used by another user");
        }

        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(newUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(),
                savedUser.getPassword());

        String token = JwtProvider.generateToken(authentication);

        AuthResponse res = new AuthResponse(token, "register succesfully");
        return res;
    }

//   "/auth/signin"
    @PostMapping("/signin")
    public AuthResponse signin(@RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticate(loginRequest.getEmail(), loginRequest.getPassword());

        String token = JwtProvider.generateToken(authentication);

        AuthResponse res = new AuthResponse(token, "Login succesfully");
        return res;
    }

    private Authentication authenticate(String email, String password) {

        UserDetails userDetails = customUserDetailService.loadUserByUsername(email);

        if (userDetails == null) {
            throw new BadCredentialsException("invalid username");
        }
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("password not matched");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
