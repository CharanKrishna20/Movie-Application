package com.example.MovieService.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class VerifyUser {
    private String UserEmailId;
    private String verificationCode;
}
