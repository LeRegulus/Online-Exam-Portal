package com.regulus.examportalbackend.services;

import com.regulus.examportalbackend.helper.UserFoundException;
import com.regulus.examportalbackend.models.User;
import com.regulus.examportalbackend.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user != null)
            return user;
        throw new UsernameNotFoundException("User Not Found!");
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public Optional<User> getUser(long id){
        return userRepository.findById(id);
    }

    public User getUserbyUsername(String username){
        return userRepository.findByUsername(username);
    }

    public User createUser(User user) throws UserFoundException {
        User user1 = userRepository.findByUsername(user.getUsername());
        User user2 = userRepository.findByEmail(user.getEmail());
        if (user1 != null || user2 != null){
            System.out.println("User is already there !!");
                throw new UserFoundException();
        }else {
            userRepository.save(user);
        }
        return user;
    }

    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }


    public User updateUser(User user, long id) {
        User user1 = userRepository.findById(id).get();
        user1.setFirstName(user.getFirstName());
        user1.setLastName(user.getLastName());
        user1.setUsername(user.getUsername());
        user1.setEmail(user.getEmail());
        user1.setPhoneNumber(user.getPhoneNumber());
        return userRepository.save(user1);
    }

    public User changePassword(User user, long id){
        User user1 = userRepository.findById(id).get();
        user1.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user1);
    }
}
