package com.example.MovieService.FeignClient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "TvShowService", url="localhost:7777")
public interface UserTvShowProxy {
    @PostMapping("/tvShow/addUser")
    public abstract ResponseEntity<?> sendUserDataToMovieService(TvShowUserDTO tvShowUserDTO);
}
