package com.bankit.pg.feignClient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "api-TvShowService", url = "localhost:7777" )
public interface TvUserClient {
  @PostMapping(value="/tvShow/updateSubscriptionStatus",consumes = "application/json")
  ResponseEntity<String> updateSubscriptionStatus(@RequestBody PaymentUpdateRequest paymentUpdateRequest);
}
