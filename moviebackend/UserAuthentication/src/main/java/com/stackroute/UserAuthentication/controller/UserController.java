package com.stackroute.UserAuthentication.controller;

import com.stackroute.UserAuthentication.exceptions.UserAlreadyExistingException;
import com.stackroute.UserAuthentication.exceptions.UserNotFoundException;
import com.stackroute.UserAuthentication.model.User;
import com.stackroute.UserAuthentication.service.JwtGenerator;
import com.stackroute.UserAuthentication.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth-app")

public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private JwtGenerator jwtGenerator;

    //http://localhost:9999/auth-app/saveUser   [POST]
    @PostMapping("/saveUser")
    public ResponseEntity<?> saveUser(@RequestBody User user) throws UserAlreadyExistingException {
       // user.setRole("Role_User");
       // user.setStatus("Active");
        return new ResponseEntity<>(userService.saveUser(user), HttpStatus.OK);
    }

    //http://localhost:9999/auth-app/loginCheck   [POST]
    @PostMapping("/loginCheck")
    public ResponseEntity<?> loginCheck(@RequestBody User user) throws UserNotFoundException {
        User result=userService.loginCheck(user.getUserEmailId(), user.getPassword());
        if(result!=null){
            result.setPassword("*****");
            return new ResponseEntity<>(jwtGenerator.generateJwt(result),HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("login failed",HttpStatus.OK);
        }
    }
}
