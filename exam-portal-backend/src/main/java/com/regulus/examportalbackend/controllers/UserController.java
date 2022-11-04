package com.regulus.examportalbackend.controllers;

import com.regulus.examportalbackend.models.Quiz;
import com.regulus.examportalbackend.models.User;
import com.regulus.examportalbackend.services.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/exam-portal/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUser(){
        return this.userService.getUsers();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable("id") Long id){
        return  this.userService.getUser(id).get();
    }

    @GetMapping("/{username}")
    public User getUser(@PathVariable("username") String username){
        return  this.userService.getUserbyUsername(username);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable("id") long id, @RequestBody User user){
        return this.userService.updateUser(user, id);
    }

    @PutMapping("/changePassword/{id}")
    public User changePassword(@PathVariable("id") long id,@RequestBody User user){
        return this.userService.changePassword(user, id);
    }

    @DeleteMapping("/{id}")
    private void deleteUser(@PathVariable("id") long id){
        this.userService.deleteUser(id);
    }



}
