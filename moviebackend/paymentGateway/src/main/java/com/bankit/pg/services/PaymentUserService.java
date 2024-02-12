package com.bankit.pg.services;

import com.bankit.pg.model.PaymentUser;
import com.example.MovieService.FeignClient.SubscriptionDTO;

public interface PaymentUserService {
    PaymentUser addUser(PaymentUser paymentUser);
    PaymentUser getCurrentUserDetails(String userEmailId);
    public PaymentUser updateSubscriptionStatus(SubscriptionDTO subscriptionDTO);
}
