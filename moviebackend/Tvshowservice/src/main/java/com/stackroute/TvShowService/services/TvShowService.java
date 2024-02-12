package com.stackroute.TvShowService.services;





import com.stackroute.TvShowService.exceptions.TvShowAlreadyExistsException;
import com.stackroute.TvShowService.exceptions.TvShowNotFoundException;
import com.stackroute.TvShowService.model.TvShow;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

public interface TvShowService {
    List<TvShow> getAllTvShows();
    List<TvShow> getAllPaginatedTvShows(int pageNumber);
    TvShow getTvShowById(String tvShowId) throws TvShowNotFoundException;
    TvShow addTvShow(TvShow tvShow, MultipartFile file) throws TvShowAlreadyExistsException;
    boolean deleteTvShow(String tvShowId) throws TvShowNotFoundException;
    TvShow updateTvShow(TvShow tvShow, MultipartFile file) throws TvShowNotFoundException;
    TvShow addReview(String tvShowId,String review) throws TvShowNotFoundException;
    List<TvShow> getAllTvShowsByGenre(String genre);
    Set<String> getAllGenres();
}
