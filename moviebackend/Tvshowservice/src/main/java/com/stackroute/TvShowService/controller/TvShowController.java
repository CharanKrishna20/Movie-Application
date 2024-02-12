package com.stackroute.TvShowService.controller;



import com.stackroute.TvShowService.exceptions.TvShowAlreadyExistsException;
import com.stackroute.TvShowService.exceptions.TvShowNotFoundException;
import com.stackroute.TvShowService.model.TvShow;
import com.stackroute.TvShowService.services.TvShowService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.nio.file.AccessDeniedException;
import java.util.Optional;

@RestController
@RequestMapping("/tvShow")

public class TvShowController {
    @Autowired
    private TvShowService tvShowService;
    @GetMapping("/allGenres")
    public ResponseEntity<?> getAllGenres(){
        return new ResponseEntity<>(tvShowService.getAllGenres(),HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllTvShows() {
        return new ResponseEntity<>(tvShowService.getAllTvShows(), HttpStatus.OK);
    }
    @GetMapping("/genre/{genre}")
    public ResponseEntity<?> getAllTvShowsByGenre(@PathVariable String genre){
        return new ResponseEntity<>(tvShowService.getAllTvShowsByGenre(genre),HttpStatus.OK);
    }
    @GetMapping("/pages")
    public ResponseEntity<?> getAllPaginatedTvShows(@RequestParam(defaultValue = "0") int pageNumber) {
        return new ResponseEntity<>(tvShowService.getAllPaginatedTvShows(pageNumber), HttpStatus.OK);
    }
    @GetMapping("/admin/{tvShowId}")
    public  ResponseEntity<?> getTvShowById(@PathVariable String tvShowId) throws TvShowNotFoundException {
        System.out.println("this is get by id");
        TvShow tvShow=tvShowService.getTvShowById(tvShowId);
        if(tvShow==null){
            throw new TvShowNotFoundException();
        }
        else{
            System.out.println("this is invoked");
            System.out.println(tvShowId);
            return new ResponseEntity<>(tvShow, HttpStatus.OK);
        }
    }

    @PostMapping(value = "/admin/addTvShow", consumes = "multipart/form-data")
    public ResponseEntity<TvShow> addTvShow(@ModelAttribute TvShow tvShow, @RequestPart("file") MultipartFile file,
                                            MultipartHttpServletRequest request) throws TvShowAlreadyExistsException, AccessDeniedException {
        // String currentRole= (String) request.getAttribute("currentRole");
//        if(currentRole!=null && currentRole.equals("ROLE_ADMIN")){
        //return new ResponseEntity<>(movieService.addMovie(movie), HttpStatus.CREATED);
//        }
//        else{
//            throw new AccessDeniedException("You do no have access to this...");
//        }

        TvShow savedTvShow = tvShowService.addTvShow(tvShow, file);
        return new ResponseEntity<>(savedTvShow, HttpStatus.CREATED);

    }

    @PostMapping(value = "/admin/updateTvShow", consumes = "multipart/form-data")
    public ResponseEntity<?> updateTvShow(@ModelAttribute TvShow tvShow, HttpServletRequest request, @RequestPart(name = "file", required = false) MultipartFile file) throws TvShowNotFoundException, AccessDeniedException {
//        String currentRole = (String) request.getAttribute("currentRole");
//        if (currentRole != null && currentRole.equals("ROLE_ADMIN")) {
//            return new ResponseEntity<>(movieService.updateMovie(movie), HttpStatus.OK);
//        } else {
//            throw new AccessDeniedException("You do not have access to this....");
//        }
        TvShow savedTvShow = tvShowService.updateTvShow(tvShow, file);
        System.out.println("update data"+tvShow);
        return new ResponseEntity<>(savedTvShow, HttpStatus.CREATED);
    }

    @DeleteMapping("/admin/deleteTvShow/{tvShowId}")
    public ResponseEntity<?> deleteMovie(@PathVariable String tvShowId, HttpServletRequest request)
            throws AccessDeniedException, TvShowNotFoundException {
//    String currentRole = (String) request.getAttribute("currentRole");
//    if (currentRole != null && currentRole.equals("ROLE_ADMIN")) {
//      return new ResponseEntity<>(movieService.deleteMovie(mid), HttpStatus.OK);
//    } else {
//      throw new AccessDeniedException("You do not have access to this.....");
//    }
        Optional<TvShow> optionalTvShow= Optional.ofNullable(tvShowService.getTvShowById(tvShowId));
        if(optionalTvShow.isEmpty()){
            throw new TvShowNotFoundException();
        }
        else{
            return new ResponseEntity<>(tvShowService.deleteTvShow(tvShowId),HttpStatus.OK);
        }

    }
    @PostMapping("/{tvShowId}/reviews")
    public ResponseEntity<?> addReviewToShow(
        @PathVariable String tvShowId, @RequestBody String review) throws TvShowNotFoundException {


        try {
            TvShow updatedtvShow = tvShowService.addReview(tvShowId, review);
            return new ResponseEntity<>(updatedtvShow, HttpStatus.OK);
        } catch (TvShowNotFoundException e) {
            throw new RuntimeException(e);
        }
    }


}
