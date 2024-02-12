package com.bankit.pg.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document
public class PaymentUser {
    @Id
    private String userEmailId;
    private String userId;
    private String userName;
    private long phoneNumber;
    private int amount;
    private boolean isSubscribed;

}
