package com.example.MovieService.service;

import com.example.MovieService.exception.MovieAlreadyExistsException;
import com.example.MovieService.exception.MovieNotFoundException;
import com.example.MovieService.model.Movie;
import com.example.MovieService.repository.MovieRepository;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class MovieServiceImpl implements MovieService {

    @Autowired
    private MovieRepository movieRepository;

    @Override
    public Set<String> getAllGenres() {
        List<Movie> allMovies=movieRepository.findAll();
        Set<String> genres=new HashSet<>();
        for(Movie movie:allMovies){
            genres.add(movie.getGenre());
        }
        return genres;
    }

    @Override
    public List<Movie> getAllPaginatedMovies(int pageNumber) {
        Pageable pageable= (Pageable) PageRequest.of(pageNumber,12);
        return movieRepository.findAll(pageable).getContent();
    }

    @Override
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }


    @Override
    public Movie getMovieById(String movieId) throws MovieNotFoundException {
        Optional<Movie> movieOptional = movieRepository.findById(movieId);
        if (movieOptional.isEmpty()) {
            throw new MovieNotFoundException();
        }
        return movieOptional.get();
    }

    @Override
    public Movie addMovie(Movie movie, MultipartFile file) throws MovieAlreadyExistsException {
        Optional<Movie> existingMovie = movieRepository.findByMovieTitle(movie.getMovieTitle());
        if (existingMovie.isPresent()) {
            throw new MovieAlreadyExistsException();
        }
        movie.setMovieId(UUID.randomUUID().toString());
        Movie savedMovie = movieRepository.save(movie);
        System.out.println(savedMovie);
        if (file != null && !file.isEmpty()) {
            try {
                String filePath = "E:\\NIIT\\Notes\\Project\\Static Server\\Images\\" + savedMovie.getMovieId() + ".jpg";
                file.transferTo(new File(filePath));
                savedMovie.setMovieImagePath("Images/" + savedMovie.getMovieId() + ".jpg");
                movieRepository.save(savedMovie);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        return savedMovie;
    }

    @Override
    public boolean deleteMovie(String movieId) throws MovieNotFoundException {
        Optional<Movie> movie = movieRepository.findById(movieId);
        if (movie.isEmpty()) {
            throw new MovieNotFoundException();
        }
        movieRepository.deleteById(movieId);
        return true;
    }

    @Override
    public Movie updateMovie(Movie movie, MultipartFile file) throws MovieNotFoundException {
        System.out.println("invoking service ");
        Optional<Movie> existingMovie = movieRepository.findById(movie.getMovieId());
        System.out.println(existingMovie);
        if (existingMovie.isEmpty()) {
            throw new MovieNotFoundException();
        }
        Movie savedMovie = existingMovie.get();
        savedMovie.setMovieTitle(movie.getMovieTitle());
        savedMovie.setMovieDescription(movie.getMovieDescription());
        savedMovie.setMovieRating(movie.getMovieRating());
        savedMovie.setGenre(movie.getGenre());
        savedMovie.setReleaseYear(movie.getReleaseYear());
        savedMovie.setMovieDirector(movie.getMovieDirector());
        savedMovie.setMovieWriters(movie.getMovieWriters());
        savedMovie.setCastAndCrew(movie.getCastAndCrew());
        savedMovie.setTrailerLink(movie.getTrailerLink());
        savedMovie.setStreamingOn(movie.getStreamingOn());
        savedMovie.setAvailableLanguages(movie.getAvailableLanguages());
        savedMovie = movieRepository.save(savedMovie);

        if (file != null && !file.isEmpty()) {
            updateMovieImage(savedMovie, file);
        }
        return savedMovie;
    }

    @Override
    public Movie addReview(String movieId, String review) throws MovieNotFoundException {
        Movie existingMovie=getMovieById(movieId);
        List<String> movieReviews=existingMovie.getMovieReviews();
        if (movieReviews == null) {
            movieReviews = new ArrayList<>();
        }
        movieReviews.add(review);
        existingMovie.setMovieReviews(movieReviews);
        return movieRepository.save(existingMovie);
    }



    private void updateMovieImage(Movie movie, MultipartFile file) {
        if (file != null && !file.isEmpty()) {
            try {
                String filePath = "E:\\NIIT\\Notes\\Project\\Static Server\\Images\\" + movie.getMovieId() + ".jpg";
                file.transferTo(new File(filePath));
                movie.setMovieImagePath("Images/" + movie.getMovieId() + ".jpg");
                movieRepository.save(movie);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }
    @Override
    public List<String> getAllReviews(String movieId) throws MovieNotFoundException {
        Movie existingMovie=getMovieById(movieId);
        return existingMovie.getMovieReviews();
    }

    @Override
    public List<Movie> getAllMoviesByGenre(String genre) {
        return movieRepository.findByGenreIgnoreCase(genre);
    }
}
