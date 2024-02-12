package com.stackroute.UserAuthentication.service;

import com.stackroute.UserAuthentication.model.User;

import java.util.Map;

public interface JwtGenerator {
    public abstract Map<String, String > generateJwt(User user);
}
