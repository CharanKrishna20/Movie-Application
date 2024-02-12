package com.bankit.pg.PayUserController;

import com.bankit.pg.model.PaymentUser;
import com.bankit.pg.services.PaymentUserService;
import com.example.MovieService.FeignClient.SubscriptionDTO;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payUser")
public class PaymentUserController {
    @Autowired
    private PaymentUserService paymentUserService;
    @PostMapping("/addUser")
    public ResponseEntity<?> addUser(@RequestBody PaymentUser paymentUser){

        paymentUser.setAmount(999);
        return new ResponseEntity<>(paymentUserService.addUser(paymentUser), HttpStatus.OK);
    }
    @GetMapping("/v1/userDetails")
    public ResponseEntity<?> getCurrentUserDetails(HttpServletRequest request){
        String currentUserEmail= (String) request.getAttribute("currentEmail");
return new ResponseEntity<>(paymentUserService.getCurrentUserDetails(currentUserEmail),HttpStatus.OK);
    }
    @PostMapping("/updateSubscriptionStatus")
    public ResponseEntity<?> updateSubscriptionStatus(@RequestBody SubscriptionDTO subscriptionDTO){
        System.out.println("test for payment user...huhuuu");
        PaymentUser paymentUser=paymentUserService.updateSubscriptionStatus(subscriptionDTO);
       // boolean isSubscribed = subscriptionDTO.isSubscribed();
        //paymentUser.setSubscribed(true);
        if (paymentUser != null) {
            return new ResponseEntity<>("Subscription status updated successfully", HttpStatus.OK);
        } else {
            // Handle the case where the user is not found
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }
}
