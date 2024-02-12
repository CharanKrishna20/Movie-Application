package com.example.MovieService.model;

import com.stackroute.TvShowService.model.TvShow;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document
public class User {
    @Id
    private String userEmailId;
    private String userId;
    private String userName;
    private String password;
    private String verificationCode;
    private boolean isVerified;
    private Date registeredDate;
    private Date verificationCodeExpiration;
   // private String firstName;
  //  private String lastName;
   // private String profilePic;
   // private String address;
   // private String gender;
    //private int age;
    //private Long phoneNumber;
    private List<Movie> wishList;
    private List<String> reviews;
    private List  tvShowWishlist;
    private boolean isSubscribed;
    private String resetCode;
    //private List<TvShow> tvShowWishlist;


}
