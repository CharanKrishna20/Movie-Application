package com.stackroute.TvShowService.repository;


import com.stackroute.TvShowService.model.TvUser;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<TvUser,String> {
    Optional<TvUser> findByUserEmailId(String userEmailId);

}
