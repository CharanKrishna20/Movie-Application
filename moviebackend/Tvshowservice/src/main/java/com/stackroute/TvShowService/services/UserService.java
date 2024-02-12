package com.stackroute.TvShowService.services;

import com.stackroute.TvShowService.exceptions.TvShowNotFoundException;
import com.stackroute.TvShowService.model.TvShow;
import com.stackroute.TvShowService.model.TvUser;


import java.util.List;

public interface UserService {
    List<TvUser> getAllUser();
    TvUser addUserToTvShow(TvUser user);
    TvUser addTvShowToTvShowWishlist(String userEmailId, TvShow tvShow);
    boolean deleteTvShowFromTvShowWishlist(String userEmail,String tvShowId) throws TvShowNotFoundException;
    List<TvShow> getAllTvShowsFromTvShowWishlist(String userEmail);

  void updateSubscriptionStatus(String userEmailId);
    boolean getSubscriptionStatus(String userEmail);
}
