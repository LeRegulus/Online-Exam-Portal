package com.regulus.examportalbackend.services;

import com.regulus.examportalbackend.config.JwtUtil;
import com.regulus.examportalbackend.helper.UserFoundEmailException;
import com.regulus.examportalbackend.helper.UserFoundException;
import com.regulus.examportalbackend.models.LoginRequest;
import com.regulus.examportalbackend.models.LoginResponse;
import com.regulus.examportalbackend.models.Role;
import com.regulus.examportalbackend.models.User;
import com.regulus.examportalbackend.repositories.RoleRepository;
import com.regulus.examportalbackend.repositories.UserRepository;
import net.bytebuddy.utility.RandomString;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;
import java.io.UnsupportedEncodingException;
import java.util.HashSet;
import java.util.Set;

@Service
@Transactional
public class AuthService {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    private final JavaMailSender mailSender;

    public AuthService(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder, UserService userService, JwtUtil jwtUtil, AuthenticationManager authenticationManager, JavaMailSender mailSender) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.mailSender = mailSender;
    }

    public User registerUserService(User user) throws Exception {
        User temp = userRepository.findByUsername(user.getUsername());
        User temp2 = userRepository.findByEmail(user.getEmail());
        if (temp != null) {
            throw new UserFoundException();
        }else if (temp2 != null){
            throw new UserFoundEmailException();
        }
        else {
            Role role = roleRepository.findById("USER").isPresent() ? roleRepository.findById("USER").get() : null;
            Set<Role> userRoles = new HashSet<>();
            userRoles.add(role);
            user.setRoles(userRoles);
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            String randomCode = RandomString.make(64);
            user.setVerificationCode(randomCode);
            user.setActive(false);
            sendVerificationEmail(user);
            return userRepository.save(user);
        }
    }

//    public ResponseEntity<?> generateToken(LoginRequest loginRequest) throws Exception {
//        try {
//            authenticate(loginRequest.getUsername(), loginRequest.getPassword());
//        }catch (UsernameNotFoundException e){
//            e.printStackTrace();
//            throw new Exception("User not found ");
//        }
//        UserDetails userDetails = userService.loadUserByUsername(loginRequest.getUsername());
//        String token = jwtUtil.generateToken(userDetails);
//        return ResponseEntity.ok(new LoginResponse(token));
//    }

    public LoginResponse loginUserService(LoginRequest loginRequest) throws Exception {

        try {
            authenticate(loginRequest.getUsername(), loginRequest.getPassword());
        }catch (UsernameNotFoundException e){
            e.printStackTrace();
            throw new Exception("User not found ");
        }
        UserDetails userDetails = userService.loadUserByUsername(loginRequest.getUsername());
        String token = jwtUtil.generateToken(userDetails);
        return new LoginResponse( userRepository.findByUsername(loginRequest.getUsername()),token);
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

    private void sendVerificationEmail(User user)
            throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = "contact@examportal.com";
        String senderName = "Diang Edu";
        String subject = "Please verify your registration";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify activate your account:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "Diang EDU Team.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getUsername());
        String verifyURL = "http://localhost:8090/exam-portal/verify?code=" + user.getVerificationCode();

        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);

        System.out.println("Email has been sent");
    }

    public Boolean verify(String verificationCode) {
        User user = userRepository.findByVerificationCode(verificationCode);

        if (user == null || user.isEnabled()) {
            return false;
        } else {
            user.setVerificationCode(null);
            user.setActive(true);
            userRepository.save(user);
            return true;
        }

    }

}
