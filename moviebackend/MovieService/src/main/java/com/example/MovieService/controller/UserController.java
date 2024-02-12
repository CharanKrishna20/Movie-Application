package com.example.MovieService.controller;


import com.example.MovieService.FeignClient.PaymentUpdateRequest;
import com.example.MovieService.exception.MovieNotFoundException;
import com.example.MovieService.exception.UserAlreadyExistingException;
import com.example.MovieService.exception.UserNotFoundException;
import com.example.MovieService.model.ForgotPasswordRequest;
import com.example.MovieService.model.Movie;
import com.example.MovieService.model.ResetPasswordRequest;
import com.example.MovieService.model.User;
import com.example.MovieService.model.VerifyUser;
import com.example.MovieService.repository.UserRepository;
import com.example.MovieService.service.EmailService;
import com.example.MovieService.service.UserService;
import com.example.MovieService.service.UserServiceImpl;

import jakarta.servlet.http.HttpServletRequest;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")

public class UserController {
    @Autowired
    private UserServiceImpl userService;
    @Autowired
    private UserRepository userRepository;

    //    @PostMapping("/verifyUser/{userEmailId}/{verificationCode}")
//    public ResponseEntity<?> verifyUser(
//            @PathVariable String userEmailId,
//            @PathVariable String verificationCode
//    ) throws UserNotFoundException {
//        System.out.println("controller...parsing");
//        return userService.verifyUser(userEmailId, verificationCode);
//    }
    @GetMapping("/allUsers")
    public ResponseEntity<?> getAllUsers(){
        return new ResponseEntity<>(userService.getAllUsers(),HttpStatus.OK);
    }
    @PostMapping("/verifyUser")
    public ResponseEntity<?> verifyUser(@RequestBody VerifyUser verifyUser) throws UserNotFoundException {
        System.out.println("Received verification request for user: " + verifyUser.getUserEmailId());
        System.out.println("Entered verification code: " + verifyUser.getVerificationCode());
        return new ResponseEntity<>( userService.verifyUser(verifyUser.getUserEmailId(), verifyUser.getVerificationCode()),HttpStatus.OK);
    }

    @PostMapping("/addUser1")
    public ResponseEntity<?> addUser1(@RequestBody User user) throws UserAlreadyExistingException {
        user.setWishList(new ArrayList<>());
        return new ResponseEntity<>(userService.addUser1(user), HttpStatus.CREATED);
    }

    @PostMapping("/addUser")
    public ResponseEntity<?> addUser(@RequestBody User user) throws UserAlreadyExistingException {
        user.setWishList(new ArrayList<>());
        return new ResponseEntity<>(userService.addUser(user), HttpStatus.CREATED);
    }
    @GetMapping("/v1/userDetails")
    public ResponseEntity<?> getUserDetails(HttpServletRequest request) throws UserNotFoundException {
        String currentUserEmail= (String) request.getAttribute("currentEmail");
        return new ResponseEntity<>(userService.getCurrentUserDetails(currentUserEmail),HttpStatus.OK);
    }
    @PostMapping("/v1/addMovieToList")
    public ResponseEntity<?> addMovieToList(@RequestBody Movie movie, HttpServletRequest request){
        String currentUserEmail=(String) request.getAttribute("currentEmail");
        User modifeduser= userService.addMovieToList(currentUserEmail,movie);
        if(modifeduser!= null){
            return new ResponseEntity<>(modifeduser, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/v1/getMovieList")
    public ResponseEntity<List<Movie>> getwishlistMovies(HttpServletRequest request){
        String currentUserEmail= (String) request.getAttribute("currentEmail");
        List<Movie> movieLists=userService.getAllwishListMovies(currentUserEmail);
        if(movieLists != null){
            return new ResponseEntity<>(movieLists,HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/v1/deleteMovie/{mid}")
    public ResponseEntity<?> deleteMovieFromList(@PathVariable String mid,HttpServletRequest request) throws MovieNotFoundException {
        String currentUserEmail=(String) request.getAttribute("currentEmail");
        if(currentUserEmail!=null){
            return new ResponseEntity<>(userService.deleteMovieFromList(currentUserEmail,mid),HttpStatus.OK);
        }
        else{
            throw new MovieNotFoundException();
        }
    }
    @PostMapping("/updateSubscriptionStatus")
    public ResponseEntity<String> updateSubscriptionStatus(@RequestBody PaymentUpdateRequest paymentUpdateRequest) {

        userService.updateSubscriptionStatus(paymentUpdateRequest.getUserEmailId());

        return new ResponseEntity<>("Subscription status updated successfully", HttpStatus.OK);
    }
    @GetMapping("/v1/subscriptionStatus")
    public ResponseEntity<?> getSubscriptionStatus(HttpServletRequest request){
        String currentUserEmail= (String) request.getAttribute("currentEmail");
        return new ResponseEntity<>(userService.getSubscriptionStatus(currentUserEmail),HttpStatus.OK) ;
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Object> forgotPassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest) throws UserNotFoundException {
        System.out.println("Received forgot password request for email: " + forgotPasswordRequest.getUserEmailId());
        try {
            String response = userService.forgotPassword(forgotPasswordRequest.getUserEmailId());
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("message", response);
            return new ResponseEntity<>(responseBody, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest resetPasswordRequest) {
        try {
            System.out.println("Received reset password request for user email: " + resetPasswordRequest.getUserEmailId());
            ResponseEntity<?> response = userService.resetPassword(resetPasswordRequest.getUserEmailId(), resetPasswordRequest.getPassword());
            return response;
        } catch (Exception e) {
            // Handle exceptions appropriately
            return new ResponseEntity<>("Error resetting password", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/verifyResetPasswordCode")
    public ResponseEntity<?> verifyResetPasswordCode(@RequestBody VerifyUser verifyUser) {
        try {
            ResponseEntity<?> response = userService.verifyResetPasswordCode(verifyUser);
            return ResponseEntity.ok().body(response.getBody()); // Wrap the response in ResponseEntity
        } catch (Exception e) {
            // Handle exceptions appropriately
            return new ResponseEntity<>("Error verifying reset password code", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
