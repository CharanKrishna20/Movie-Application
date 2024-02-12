package com.example.MovieService.service;

import com.example.MovieService.FeignClient.*;
import com.example.MovieService.exception.UserAlreadyExistingException;
import com.example.MovieService.exception.UserNotFoundException;
import com.example.MovieService.model.Movie;
import com.example.MovieService.model.User;
import com.example.MovieService.model.VerifyUser;
import com.example.MovieService.repository.UserRepository;
import com.stackroute.TvShowService.model.PaymentUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.*;
import java.util.concurrent.TimeUnit;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserProxy userProxy;
    @Autowired
    private EmailService emailService;
    @Autowired
    private UserTvShowProxy userTvShowProxy;
    @Autowired
    private PaymentUserProoxy paymentUserProoxy;

    @Override
    public User addUser(User user) throws UserAlreadyExistingException {
        Optional<User> userOptional = userRepository.findById(user.getUserEmailId());
        if (userOptional.isEmpty()) {
            userRepository.save(user);
        } else {
            throw new UserAlreadyExistingException();
        }
        return user;
    }

    @Override
    public User getCurrentUserDetails(String userEmailId) throws UserNotFoundException {
        Optional<User> userOptional = userRepository.findById(userEmailId);
        if (userOptional.isEmpty()) {
            throw new UserNotFoundException();
        }
        return userRepository.findById(userEmailId).get();
    }

    @Override
    public User addMovieToList(String userEmailId, Movie movie) {
        User user = userRepository.findById(userEmailId).get();
        System.out.println("........." + user);
        user.getWishList().add(movie);
        System.out.println("Movie added successfully");
        return userRepository.save(user);
    }

    @Override
    public boolean deleteMovieFromList(String userEmailId, String movieId) {
        User user = userRepository.findById(userEmailId).orElse(null);
        if (user != null) {
            user.getWishList().removeIf(movie -> movie.getMovieId().equals(movieId));
            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Override
    public User addUser1(User user) throws UserAlreadyExistingException {
//        UserDTO userDTO = new UserDTO(user.getUserEmailId(), user.getPassword(), user.getUserId(),"ROLE_USER","Active");
//      ResponseEntity<?> response =userProxy.sendUserDataToAuthApp(userDTO);
//        System.out.println(response);
        Optional<User> optionalUser = userRepository.findById(user.getUserEmailId());
        if (optionalUser.isPresent()) {
            throw new UserAlreadyExistingException();
        }

        String verificationCode = generateVerificationCode();
//my code my wish...
        // Save user with verification code and not verified status
        user.setVerificationCode(verificationCode);
        user.setVerified(false);
        user.setRegisteredDate(new Date());

        userRepository.save(user);

        // Send verification code to the user's email
        emailService.sendVerificationCode(user.getUserEmailId(), verificationCode, user.getUserName());

        //return new ResponseEntity<>("User added successfully. Verification code sent to the email.", HttpStatus.CREATED);

        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<Movie> getAllwishListMovies(String emailId) {
        User user = userRepository.findById(emailId).orElse(null);
        if (user != null) {
            return user.getWishList();
        }
        return null;
    }

    public ResponseEntity<?> verifyUser(String userEmailId, String enteredCode) throws UserNotFoundException {
        User user = userRepository.findById(userEmailId).get();
        System.out.println(userEmailId);
        //.orElseThrow(() -> new UserNotFoundException());
        // System.out.println("user found..");

        if (!user.isVerified() && user.getVerificationCode().equals(enteredCode)
        ) {
            System.out.println("If block running...");
            // Mark the user as verified
            user.setVerified(true);
            UserDTO userDTO = new UserDTO(user.getUserEmailId(), user.getPassword(), user.getUserId(), "ROLE_USER",
                "Active");
            ResponseEntity<?> response = userProxy.sendUserDataToAuthApp(userDTO);
            System.out.println(response);
            TvShowUserDTO tvShowUserDTO = new TvShowUserDTO(user.getUserEmailId(), user.getUserId(), user.getUserName(),
                user.getTvShowWishlist());
            ResponseEntity<?> response1 = userTvShowProxy.sendUserDataToMovieService(tvShowUserDTO);
            System.out.println(response1);
            PaymentUserDTO paymentUserDTO = new PaymentUserDTO(user.getUserEmailId(), user.getUserId(),
                user.getUserName());
            ResponseEntity<?> response2 = paymentUserProoxy.sendPaymentUserDataToPaymentService(paymentUserDTO);
            System.out.println(response2);

            userRepository.save(user);

            return new ResponseEntity<>("Account verified successfully!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid verification code or user not found.", HttpStatus.BAD_REQUEST);
        }
    }

    private String generateVerificationCode() {
        SecureRandom random = new SecureRandom();
        StringBuilder code = new StringBuilder(6); // Adjust the length as needed

        String characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        for (int i = 0; i < 6; i++) {
            int randomIndex = random.nextInt(characters.length());
            char randomChar = characters.charAt(randomIndex);
            code.append(randomChar);
        }

        // Set verification code and expiration time in the user object

        return code.toString();

    }

    private boolean isVerificationCodeValid(Date expirationTime) {
        return expirationTime != null && expirationTime.after(new Date());
    }

    private Date generateVerificationCodeExpiration() {
        // Set the expiration time (e.g., 15 minutes from now)
        return new Date(System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(15));
    }

    @Override
    public void updateSubscriptionStatus(String userEmailId) {
        Optional<User> optional = userRepository.findById(userEmailId);
        System.out.println("test for update");
        optional.ifPresent(user -> {
            user.setSubscribed(true);
            SubscriptionDTO subscriptionDTO=new SubscriptionDTO(user.getUserEmailId(),user.isSubscribed());
            ResponseEntity<String> response=  paymentUserProoxy.updateSubscriptionStatus(subscriptionDTO);
            System.out.println(user.getUserName());
            userRepository.save(user);
        });

    }

    @Override
    public boolean getSubscriptionStatus(String userEmail) {
        Optional<User> optional = userRepository.findById(userEmail);
        System.out.println("get subscription status");
        if(optional.isPresent()){
            return optional.get().isSubscribed();
        }
        return false;
    }
@Override
    public String forgotPassword(String userEmailId) throws UserNotFoundException {
        Optional<User> optionalUser = userRepository.findById(userEmailId);
        if (optionalUser == null) {
            throw new UserNotFoundException();
        }

    if (optionalUser.isPresent()) {
        User user = optionalUser.get();

        String resetCode = generateResetCode();
        user.setResetCode(resetCode);

        userRepository.save(user);

        // Send reset code to the user's email
        emailService.sendResetCode(userEmailId, resetCode, user.getUserName());
            // Send reset code to the user's email

            return "Reset code sent successfully to " + userEmailId;
        } else {
            throw new UserNotFoundException();
        }
    }

    private String generateResetCode() {
        SecureRandom random = new SecureRandom();
        StringBuilder code = new StringBuilder(6); // Adjust the length as needed

        String characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        for (int i = 0; i < 6; i++) {
            int randomIndex = random.nextInt(characters.length());
            char randomChar = characters.charAt(randomIndex);
            code.append(randomChar);
        }



        // Set verification code and expiration time in the user object


        return code.toString();

    }

    public ResponseEntity<?> resetPassword(String userEmailId, String newPassword) {
        try {

            Optional<User> userOptional = userRepository.findById(userEmailId);

            if (userOptional.isPresent()) {
                User user = userOptional.get();


                user.setPassword(newPassword);
                userRepository.save(user);


                UserDTO userDTO = new UserDTO(user.getUserEmailId(), newPassword, user.getUserId(), "ROLE_USER", "Active");
                ResponseEntity<?> authResponse = userProxy.sendUserDataToAuthApp(userDTO);
                System.out.println(authResponse);  // Log the authentication service response, if needed

                return new ResponseEntity<>("Password reset successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            // Handle exceptions appropriately
            return new ResponseEntity<>("Error resetting password", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    public ResponseEntity<?> verifyResetPasswordCode(VerifyUser verifyUser) {
        try {

            Optional<User>  user = userRepository.findById(verifyUser.getUserEmailId());

            if (user != null && user.get().getResetCode().equals(verifyUser.getVerificationCode())) {


                return new ResponseEntity<>("Reset password code verified successfully", HttpStatus.OK);
            } else {
                // Code is invalid or user not found
                return new ResponseEntity<>("Invalid reset password code or user not found", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            // Handle exceptions appropriately
            return new ResponseEntity<>("Error verifying reset password code", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




}