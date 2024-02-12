package com.stackroute.UserAuthentication.repository;

import com.stackroute.UserAuthentication.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    User findByUserEmailIdAndPassword(String userEmailId,String password);
}
