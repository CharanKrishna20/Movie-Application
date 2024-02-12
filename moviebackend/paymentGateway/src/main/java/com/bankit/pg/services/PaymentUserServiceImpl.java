package com.bankit.pg.services;

import com.bankit.pg.model.PaymentUser;
import com.bankit.pg.repository.PaymentRepository;
import com.example.MovieService.FeignClient.SubscriptionDTO;
import com.example.MovieService.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PaymentUserServiceImpl implements PaymentUserService{
    @Autowired
    private PaymentRepository paymentRepository;
    @Override
    public PaymentUser addUser(PaymentUser paymentUser) {
        return paymentRepository.save(paymentUser);
    }

    @Override
    public PaymentUser getCurrentUserDetails(String userEmailId) {
        Optional<PaymentUser> optional = paymentRepository.findById(userEmailId);
        if(optional.isPresent()){
            return paymentRepository.findById(userEmailId).get();
        }
        return null;

    }

    @Override
    public PaymentUser updateSubscriptionStatus(SubscriptionDTO subscriptionDTO) {
        Optional<PaymentUser> optional = paymentRepository.findById(subscriptionDTO.getUserEmailId());

        if (optional.isPresent()) {
            PaymentUser user = optional.get();
            user.setSubscribed(subscriptionDTO.isSubscribed());
            return paymentRepository.save(user);
        }

        // Handle the case where the user is not found
        // You may want to throw an exception or return an appropriate response
        return null;
    }

}
