package com.stackroute.TvShowService.services;

import com.stackroute.TvShowService.model.TvShow;
import com.stackroute.TvShowService.model.TvUser;

import com.stackroute.TvShowService.repository.UserRepository;
import java.util.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<TvUser> getAllUser() {
        return  userRepository.findAll();
    }

    @Override
    public TvUser addUserToTvShow(TvUser user) {
     return  userRepository.save(user);
    }

    @Override
    public TvUser addTvShowToTvShowWishlist(String userEmailId, TvShow tvShow) {
        Optional<TvUser> optionalUser = userRepository.findByUserEmailId(userEmailId);
        if (optionalUser.isPresent()) {
            TvUser user = optionalUser.get();
            List<TvShow> tvShowList = user.getTvShowWishlist();

            if (tvShowList == null) {
                tvShowList = new ArrayList<>();
            }

            tvShowList.add(tvShow);
            user.setTvShowWishlist(tvShowList);

            userRepository.save(user);
            return user;
        }

        return null;

//

    }

    @Override
    public boolean deleteTvShowFromTvShowWishlist(String userEmail, String tvShowId) {
        Optional<TvUser>optionalUser=userRepository.findById(userEmail);
        if(optionalUser.isPresent()){
            TvUser user=optionalUser.get();
            List<TvShow> tvShowList=user.getTvShowWishlist();
            tvShowList.removeIf(tvShow -> tvShow.getTvShowId().equals(tvShowId));
            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Override
    public List<TvShow> getAllTvShowsFromTvShowWishlist(String userEmailId) {
        if (userEmailId != null) {
            Optional<TvUser> optionalUser = userRepository.findById(userEmailId);
            System.out.println("getallwishlisht.....");
            return optionalUser.map(TvUser::getTvShowWishlist).orElse(null);
        } else {
            // Handle the case where userEmailId is null
            return Collections.emptyList(); // Or another appropriate response
        }
    }
    @Override
    public void updateSubscriptionStatus(String userEmailId) {
        Optional<TvUser> optional = userRepository.findById(userEmailId);
        System.out.println("test for update");
      if(optional.isPresent()){
          TvUser user=optional.get();
          user.setSubscribed(true);
          userRepository.save(user);
      }

    }

    @Override
    public boolean getSubscriptionStatus(String userEmail) {
        Optional<TvUser> optional = userRepository.findById(userEmail);
        System.out.println("get subscription status");
        if(optional.isPresent()){
            return optional.get().isSubscribed();
        }
        return false;
    }

}
