package com.stackroute.TvShowService.controllerTest;

import static com.stackroute.TvShowService.controllerTest.TvshowControllerTest.convertToJson;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.TvShowService.controller.UserController;
import com.stackroute.TvShowService.model.TvShow;
import com.stackroute.TvShowService.model.TvUser;
import com.stackroute.TvShowService.services.TvShowService;
import com.stackroute.TvShowService.services.UserService;
import java.util.Collections;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest  {
  @Autowired
  private MockMvc mockMvc;
  @Mock
  private UserService userService;
  @InjectMocks
  private UserController userController;

  private TvUser user;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
  }

  @Test
  void testAddUserToTvShow() throws Exception {
    TvUser user = new TvUser("user@example.com", "123", "John Doe", Collections.emptyList());
    TvShow tvShow=new TvShow("Tv1", "you", "2022", "thriller", "you.jpg", "A thriller series",
        5.0d, Collections.singletonList("review"), "Director", Collections.singletonList("Writer"),
        "trailerLink", Collections.singletonList("netflix"), Collections.singletonList("Penn badgley"),
        Collections.singletonList("English"));

    when(userService.addUserToTvShow(any(TvUser.class))).thenReturn(user);

    mockMvc.perform(post("/tvShow/addUser")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(user)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.userEmailId").value("user@example.com"));

    verify(userService, times(1)).addUserToTvShow(any(TvUser.class));
    verifyNoMoreInteractions(userService);
  }
  @Test
  void testGetAllUsers() throws Exception {
    when(userService.getAllUser()).thenReturn(Collections.emptyList());

    mockMvc.perform(get("/tvShow/total"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$").isArray());

    verify(userService, times(1)).getAllUser();
    verifyNoMoreInteractions(userService);
  }
//  @Test
//  void testAddTvShowToWishlist() throws Exception {
//
//    TvShow tvShow = new TvShow("123", "you", "2022", "thriller", "you.jpg", "A thriller series",
//        5.0d, Collections.singletonList("review"), "Director", Collections.singletonList("Writer"),
//        "trailerLink", Collections.singletonList("netflix"), Collections.singletonList("Penn badgley"),
//        Collections.singletonList("English"));
//    TvUser modifiedUser = new TvUser("user@example.com", "123", "John Doe", Collections.singletonList(tvShow));
//
//    userService.addTvShowToTvShowWishlist("user@example.com", tvShow);
//    mockMvc.perform(post("/tvShow/user/addTvShowToWishlist")
//            .header("currentEmail", "user@example.com")
//            .contentType(MediaType.APPLICATION_JSON)
//            .content(convertToJson(tvShow)))
//        .andExpect(status().isOk())
//        .andDo(MockMvcResultHandlers.print());
//
//
//    verify(userService, times(1)).addTvShowToTvShowWishlist("user@example.com", tvShow);
//  }
}


