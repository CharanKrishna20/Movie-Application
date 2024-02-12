package com.stackroute.TvShowService.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document

public class TvUser {
    @Id
    private String userEmailId;
    private String userId;
    private String userName;

    private List tvShowWishlist;
    private boolean isSubscribed;
}
