package com.example.MovieService.FeignClient;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PaymentUserDTO {
    private String userEmailId;
    private String userId;
    private String userName;
}
