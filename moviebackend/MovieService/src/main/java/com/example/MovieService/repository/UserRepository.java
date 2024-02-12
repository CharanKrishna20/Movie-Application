package com.example.MovieService.repository;

import com.example.MovieService.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User,String > {
}
