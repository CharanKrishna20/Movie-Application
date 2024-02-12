package com.example.MovieService.FeignClient;

import com.stackroute.TvShowService.model.PaymentUpdateRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "paymentService", url="localhost:7766")
public interface PaymentUserProoxy {
    @PostMapping("/payUser/addUser")
    public abstract ResponseEntity<?> sendPaymentUserDataToPaymentService(PaymentUserDTO paymentUserDTO);

    @PostMapping("/payUser/updateSubscriptionStatus")
    ResponseEntity<String> updateSubscriptionStatus(@RequestBody SubscriptionDTO subscriptionDTO);
}
