package com.stackroute.TvShowService.controller;

import com.stackroute.TvShowService.exceptions.TvShowNotFoundException;
import com.stackroute.TvShowService.model.PaymentUpdateRequest;
import com.stackroute.TvShowService.model.TvShow;
import com.stackroute.TvShowService.model.TvUser;

import com.stackroute.TvShowService.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/tvShow")
public class UserController {
@Autowired
    private UserService userService;
@GetMapping("/total")
public ResponseEntity<?> getallUsers(){
    return new ResponseEntity<>(userService.getAllUser(),HttpStatus.OK);
}
@PostMapping("/addUser")
public ResponseEntity<?> addUserToTvShow(@RequestBody TvUser user){
    user.setTvShowWishlist(new ArrayList<>());
    return new ResponseEntity<>(userService.addUserToTvShow(user),HttpStatus.OK);
}

    @PostMapping("/user/addTvShowToWishlist")
    public ResponseEntity<?> addTvShowToWishlist(HttpServletRequest request ,@RequestBody TvShow tvShow){
        System.out.println("inside controller");
    String currentUserEmail= (String) request.getAttribute("currentEmail");

        System.out.println("......."+currentUserEmail);
        TvUser modefiedUser=userService.addTvShowToTvShowWishlist(currentUserEmail,tvShow);
//        System.out.println(userEmail);
//        System.out.println(modefiedUser);
        if(modefiedUser!= null){
            return new ResponseEntity<>(modefiedUser, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/user/delete/{tvShowId}")
    public ResponseEntity<?> deltetvshowFromWIshlist(@PathVariable String tvShowId,HttpServletRequest request) throws TvShowNotFoundException {
        String currentUserEmail=(String) request.getAttribute("currentEmail");
        return new ResponseEntity<>(userService.deleteTvShowFromTvShowWishlist(currentUserEmail,tvShowId),HttpStatus.OK);
    }
    @GetMapping("/user/tvShows")
    public ResponseEntity<?> getAllTvShowsFromWishlist(HttpServletRequest request){
        String currentUserEmail= (String) request.getAttribute("currentEmail");
        return new ResponseEntity<>(userService.getAllTvShowsFromTvShowWishlist(currentUserEmail),HttpStatus.OK);
    }
    @PostMapping("/updateSubscriptionStatus")
    public ResponseEntity<?> updateSubscriptionStatus(@RequestBody PaymentUpdateRequest paymentUpdateRequest) {
        System.out.println("tv feign-client");

        userService.updateSubscriptionStatus(paymentUpdateRequest.getUserEmailId());

        return new ResponseEntity<>("Subscription status updated successfully", HttpStatus.OK);
    }

    @GetMapping("/user/subscriptionStatus")
    public ResponseEntity<?> getSubscriptionStatus(HttpServletRequest request){
        String currentUserEmail= (String) request.getAttribute("currentEmail");
        return new ResponseEntity<>(userService.getSubscriptionStatus(currentUserEmail),HttpStatus.OK) ;
    }

}
