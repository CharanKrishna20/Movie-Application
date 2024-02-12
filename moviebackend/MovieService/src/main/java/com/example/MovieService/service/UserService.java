package com.example.MovieService.service;

import com.example.MovieService.exception.UserAlreadyExistingException;
import com.example.MovieService.exception.UserNotFoundException;
import com.example.MovieService.model.Movie;
import com.example.MovieService.model.User;

import java.util.List;

public interface UserService {

    User addUser(User user) throws UserAlreadyExistingException;

    User getCurrentUserDetails(String userEmail) throws UserNotFoundException;

    User addMovieToList(String userEmail, Movie movie);

    boolean deleteMovieFromList(String userEmail, String movieId);

    User addUser1(User user) throws UserAlreadyExistingException;

    List<User> getAllUsers();

    List<Movie> getAllwishListMovies(String emailId);

    void updateSubscriptionStatus(String emailId);

    boolean getSubscriptionStatus(String userEmail);

    String forgotPassword(String userEmailId) throws UserNotFoundException;
}

