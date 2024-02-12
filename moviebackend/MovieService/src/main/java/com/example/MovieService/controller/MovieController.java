package com.example.MovieService.controller;

import com.example.MovieService.exception.MovieAlreadyExistsException;
import com.example.MovieService.exception.MovieNotFoundException;
import com.example.MovieService.model.Movie;
import com.example.MovieService.service.MovieService;
import jakarta.servlet.http.HttpServletRequest;
import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@RestController
@RequestMapping("/movies")

public class MovieController {

  @Autowired
  private MovieService movieService;
  @GetMapping("/allGenres")
  public ResponseEntity<?> getAllGenres(){
    return new ResponseEntity<>(movieService.getAllGenres(),HttpStatus.OK);
  }
  @GetMapping("/genre/{genre}")
  public ResponseEntity<?> getAllMoviesByGenre(@PathVariable String genre){
    return new ResponseEntity<>(movieService.getAllMoviesByGenre(genre),HttpStatus.OK);
  }

  @GetMapping("/pages")
  public ResponseEntity<?> getAllPaginatedMovies(@RequestParam(defaultValue = "0") int pageNumber) {
    return new ResponseEntity<>(movieService.getAllPaginatedMovies(pageNumber), HttpStatus.OK);
  }
  @GetMapping("/all")
  public ResponseEntity<?> getAllMovies() {

    return new ResponseEntity<>(movieService.getAllMovies(), HttpStatus.OK);
  }


  @GetMapping("/admin/{movieId}")
  public ResponseEntity<?> getMovieById(@PathVariable String movieId) throws MovieNotFoundException {
    System.out.println("this is get by id");
    Movie movie = movieService.getMovieById(movieId);
    if (movie == null) {
      throw new MovieNotFoundException();
    } else {
      System.out.println("this is invoked");
      System.out.println(movieId);
      return new ResponseEntity<>(movie, HttpStatus.OK);
    }
  }

  @PostMapping(value = "/admin/addMovie", consumes = "multipart/form-data")
  public ResponseEntity<Movie> addMovie(@ModelAttribute Movie movie, @RequestPart("file") MultipartFile file,
      MultipartHttpServletRequest request) throws MovieAlreadyExistsException, AccessDeniedException {
    // String currentRole= (String) request.getAttribute("currentRole");
//        if(currentRole!=null && currentRole.equals("ROLE_ADMIN")){
    //return new ResponseEntity<>(movieService.addMovie(movie), HttpStatus.CREATED);
//        }
//        else{
//            throw new AccessDeniedException("You do no have access to this...");
//        }

    Movie savedMovie = movieService.addMovie(movie, file);
    return new ResponseEntity<>(savedMovie, HttpStatus.CREATED);

  }

  @PostMapping(value = "/admin/updateMovie", consumes = "multipart/form-data")
  public ResponseEntity<?> updateMovie(@ModelAttribute Movie movie, HttpServletRequest request,
      @RequestPart(name = "file", required = false) MultipartFile file)
      throws MovieNotFoundException, AccessDeniedException {
//        String currentRole = (String) request.getAttribute("currentRole");
//        if (currentRole != null && currentRole.equals("ROLE_ADMIN")) {
//            return new ResponseEntity<>(movieService.updateMovie(movie), HttpStatus.OK);
//        } else {
//            throw new AccessDeniedException("You do not have access to this....");
//        }
    Movie savedMovie = movieService.updateMovie(movie, file);
    System.out.println("update data" + movie);
    return new ResponseEntity<>(savedMovie, HttpStatus.CREATED);
  }

  @DeleteMapping("/admin/deleteMovie/{mid}")
  public ResponseEntity<?> deleteMovie(@PathVariable String mid, HttpServletRequest request)
      throws MovieNotFoundException, AccessDeniedException {
//    String currentRole = (String) request.getAttribute("currentRole");
//    if (currentRole != null && currentRole.equals("ROLE_ADMIN")) {
//      return new ResponseEntity<>(movieService.deleteMovie(mid), HttpStatus.OK);
//    } else {
//      throw new AccessDeniedException("You do not have access to this.....");
//    }
    Optional<Movie> movieToDelete = Optional.ofNullable(movieService.getMovieById(mid));
    if (movieToDelete.isEmpty()) {
      throw new MovieNotFoundException();
    } else {
      return new ResponseEntity<>(movieService.deleteMovie(mid), HttpStatus.OK);
    }

  }

  @PostMapping("/{movieId}/reviews")
  public ResponseEntity<?> addReviewToMovie(
      @PathVariable String movieId, @RequestBody String review) throws MovieNotFoundException {

    try {
      Movie upadtedMovie = movieService.addReview(movieId, review);
      return new ResponseEntity<>(upadtedMovie, HttpStatus.OK);
    } catch (MovieNotFoundException e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }
  }
  @GetMapping("/{movieId}/allReviews")
  public ResponseEntity<?> getAllReviews(@PathVariable String movieId){
    try {
      List<String> reviews = movieService.getAllReviews(movieId);
      return ResponseEntity.ok(reviews);
    } catch (MovieNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

  }

}
