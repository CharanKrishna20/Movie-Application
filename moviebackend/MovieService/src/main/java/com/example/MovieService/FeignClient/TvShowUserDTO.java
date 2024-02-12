package com.example.MovieService.FeignClient;

import com.stackroute.TvShowService.model.TvShow;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TvShowUserDTO {
    @Id

    private String userEmailId;
    private String userId;
    private String userName;

    private List tvShowWishlist;
}
