package com.example.MovieService.FeignClient;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SubscriptionDTO {
  private String userEmailId;
  private boolean isSubscribed;

}
