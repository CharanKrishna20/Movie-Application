package com.stackroute.TvShowService.services;



import com.stackroute.TvShowService.exceptions.TvShowAlreadyExistsException;
import com.stackroute.TvShowService.exceptions.TvShowNotFoundException;
import com.stackroute.TvShowService.model.TvShow;
import com.stackroute.TvShowService.repository.TvShowRepository;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class TvShowServiceImpl implements TvShowService{
    @Autowired
    private TvShowRepository tvShowRepository;
    @Override
    public List<TvShow> getAllTvShows() {
        return tvShowRepository.findAll();
    }

    @Override
    public List<TvShow> getAllPaginatedTvShows(int pageNumber) {
        Pageable pageable= (Pageable) PageRequest.of(pageNumber,12);
        return tvShowRepository.findAll(pageable).getContent();
    }

    @Override
    public TvShow getTvShowById(String tvShowId) throws TvShowNotFoundException {
        Optional<TvShow> tvShowOptional = tvShowRepository.findById(tvShowId);
        if (tvShowOptional.isEmpty()) {
            throw new TvShowNotFoundException();
        }
        return tvShowOptional.get();
    }

    @Override
    public TvShow addTvShow(TvShow tvShow, MultipartFile file) throws TvShowAlreadyExistsException {
        Optional<TvShow> existingTvShow = tvShowRepository.findByshowTitle(tvShow.getShowTitle());
        if (existingTvShow.isPresent()) {
            throw new TvShowAlreadyExistsException();
        }
        tvShow.setTvShowId(UUID.randomUUID().toString());
        TvShow savedTvShow = tvShowRepository.save(tvShow);
        if (file != null && !file.isEmpty()) {
            try {
                String filePath = "E:\\NIIT\\Notes\\Project\\Static Server\\Images\\" + savedTvShow.getTvShowId() + ".jpg";
                file.transferTo(new File(filePath));
                savedTvShow.setShowImagePath("Images/" + savedTvShow.getTvShowId() + ".jpg");
                tvShowRepository.save(savedTvShow);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        return savedTvShow;
    }

    @Override
    public boolean deleteTvShow(String tvShowId) throws TvShowNotFoundException {
        Optional<TvShow> tvShow = tvShowRepository.findById(tvShowId);
        if (tvShow.isEmpty()) {
            throw new TvShowNotFoundException();
        }
        tvShowRepository.deleteById(tvShowId);
        return true;
    }

    @Override
    public TvShow updateTvShow(TvShow tvShow, MultipartFile file) throws TvShowNotFoundException{
        System.out.println("invoking service ");
        Optional<TvShow> existingTvShow = tvShowRepository.findById(tvShow.getTvShowId());
        System.out.println(existingTvShow);
        if (existingTvShow.isEmpty()) {
            throw new TvShowNotFoundException();
        }
        TvShow savedTvShow = existingTvShow.get();
        savedTvShow.setShowTitle(tvShow.getShowTitle());
        savedTvShow.setShowDescription(tvShow.getShowDescription());
        savedTvShow.setShowRating(tvShow.getShowRating());
        savedTvShow.setGenre(tvShow.getGenre());
        savedTvShow.setReleaseYear(tvShow.getReleaseYear());
        savedTvShow.setShowDirector(tvShow.getShowDirector());
        savedTvShow.setShowWriters(tvShow.getShowWriters());
        savedTvShow.setCastAndCrew(tvShow.getCastAndCrew());
        savedTvShow.setTrailerLink(tvShow.getTrailerLink());
        savedTvShow.setAvailableLanguages(tvShow.getAvailableLanguages());
        savedTvShow.setStreamingOn(tvShow.getStreamingOn());
        savedTvShow = tvShowRepository.save(savedTvShow);

        if (file != null && !file.isEmpty()) {
            updateTvShowImage(savedTvShow, file);
        }
        return savedTvShow;
    }
    private void updateTvShowImage(TvShow tvShow, MultipartFile file) {
        if (file != null && !file.isEmpty()) {
            try {
                String filePath = "E:\\NIIT\\Notes\\Project\\Static Server\\Images\\" + tvShow.getTvShowId() + ".jpg";
                file.transferTo(new File(filePath));
                tvShow.setShowImagePath("images/" + tvShow.getTvShowId() + ".jpg");
                tvShowRepository.save(tvShow);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }
    @Override
    public TvShow addReview(String tvShowId, String review) throws  TvShowNotFoundException {
        TvShow existingTvShow=getTvShowById(tvShowId);
        List<String> showReviews=existingTvShow.getShowReviews();
        if (showReviews == null) {
            showReviews = new ArrayList<>();
        }
        showReviews.add(review);
        existingTvShow.setShowReviews(showReviews);
        return tvShowRepository.save(existingTvShow);
    }

    @Override
    public List<TvShow> getAllTvShowsByGenre(String genre) {
        return tvShowRepository.findByGenreIgnoreCase(genre);
    }

    @Override
    public Set<String> getAllGenres() {
        List<TvShow> allTvShows=tvShowRepository.findAll();
        Set<String> genres=new HashSet<>();
        for(TvShow tvShow:allTvShows){
            genres.add(tvShow.getGenre());
        }
        return genres;
    }
}
