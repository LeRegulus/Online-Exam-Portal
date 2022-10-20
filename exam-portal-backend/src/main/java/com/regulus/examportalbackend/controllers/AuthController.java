package com.regulus.examportalbackend.controllers;

import com.regulus.examportalbackend.models.LoginRequest;
import com.regulus.examportalbackend.models.LoginResponse;
import com.regulus.examportalbackend.models.User;
import com.regulus.examportalbackend.services.AuthService;
import com.regulus.examportalbackend.services.UserService;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class AuthController {

    private final AuthService authService;

    private final UserService userService;

    public AuthController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) throws Exception {
        return authService.registerUserService(user);
    }

    @PostMapping("/login")
    public LoginResponse loginUser(@RequestBody LoginRequest loginRequest) throws Exception {
        return authService.loginUserService(loginRequest);
    }

    @GetMapping("/verify")
    public Boolean verifyUser(@Param("code") String code) {
        return authService.verify(code);
    }
    

}
