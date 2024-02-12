package com.stackroute.UserAuthentication.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class User {
    @Id
    private String userEmailId;
    private String password;
    private String userId;
//    private String firstName;
//    private String lastName;
//    private int age;
//    private String address;
    private String role;
    private String status;

}
