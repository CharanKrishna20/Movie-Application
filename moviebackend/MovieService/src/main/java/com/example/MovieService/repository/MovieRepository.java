package com.example.MovieService.repository;

import com.example.MovieService.model.Movie;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


public interface MovieRepository extends MongoRepository<Movie,String> {
    Optional<Movie> findByMovieTitle(String movieTitle);
    List<Movie> findByGenreIgnoreCase(String genre);
}
