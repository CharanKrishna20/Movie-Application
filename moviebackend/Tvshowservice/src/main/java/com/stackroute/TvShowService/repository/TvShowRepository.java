package com.stackroute.TvShowService.repository;


import com.stackroute.TvShowService.model.TvShow;

import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TvShowRepository extends MongoRepository<TvShow,String> {
  Optional<TvShow> findByshowTitle(String showTitle);
  List<TvShow> findByGenreIgnoreCase(String genre);
}
