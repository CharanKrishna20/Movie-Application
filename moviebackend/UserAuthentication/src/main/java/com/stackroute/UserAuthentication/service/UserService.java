package com.stackroute.UserAuthentication.service;

import com.stackroute.UserAuthentication.exceptions.UserAlreadyExistingException;
import com.stackroute.UserAuthentication.exceptions.UserNotFoundException;
import com.stackroute.UserAuthentication.model.User;

public interface UserService  {
    public abstract  User saveUser(User user) throws UserAlreadyExistingException;
    public abstract User loginCheck(String emailId, String password) throws UserNotFoundException;
}
