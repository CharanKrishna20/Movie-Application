package com.example.MovieService.service;

import com.example.MovieService.exception.MovieAlreadyExistsException;
import com.example.MovieService.exception.MovieNotFoundException;
import com.example.MovieService.model.Movie;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

public interface MovieService {
    Set<String> getAllGenres();
    List<Movie> getAllPaginatedMovies(int pageNumber);
    List<Movie> getAllMovies();
    Movie getMovieById(String movieId) throws MovieNotFoundException;
    Movie addMovie(Movie movie, MultipartFile file) throws MovieAlreadyExistsException;
    boolean deleteMovie(String movieId) throws MovieNotFoundException;
    Movie updateMovie(Movie movie, MultipartFile file) throws MovieNotFoundException;
    Movie addReview(String movieId,String review) throws MovieNotFoundException;
    List<String> getAllReviews(String movieId) throws MovieNotFoundException;
    List<Movie> getAllMoviesByGenre(String genre);



}
