package com.stackroute.UserAuthentication.service;

import com.stackroute.UserAuthentication.exceptions.UserAlreadyExistingException;
import com.stackroute.UserAuthentication.exceptions.UserNotFoundException;
import com.stackroute.UserAuthentication.model.User;
import com.stackroute.UserAuthentication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;

    @Override
    public User saveUser(User user) throws UserAlreadyExistingException {
        Optional<User>user1=userRepository.findById(user.getUserId());
                if(user1.isPresent()){
                    throw new UserAlreadyExistingException();
                }
             return userRepository.save(user);
    }

    @Override
    public User loginCheck(String emailId, String password) throws UserNotFoundException {
        User user = userRepository.findByUserEmailIdAndPassword(emailId, password);
        System.out.println(user);
        if (user == null) {
            throw new UserNotFoundException();
        }
        return user;
    }


}
