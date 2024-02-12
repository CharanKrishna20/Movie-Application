package com.example.MovieService.FeignClient;

import com.example.MovieService.model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "auth-app", url="localhost:9999")
public interface UserProxy {
    @PostMapping("/auth-app/saveUser")
    public abstract ResponseEntity<?> sendUserDataToAuthApp(UserDTO userDTO);
}
