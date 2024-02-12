package com.bankit.pg.feignClient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "userService", url = "localhost:8888" )
public interface UserServiceClient {

  @PostMapping(value="/user/updateSubscriptionStatus",consumes = "application/json")
  ResponseEntity<String> updateSubscriptionStatus(@RequestBody PaymentUpdateRequest paymentUpdateRequest);
}
