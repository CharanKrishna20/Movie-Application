package com.example.MovieService.FeignClient;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class UserDTO {
    private String userEmailId;
    private String password;
    private String userId;
    private String role;
    private String status;
}
