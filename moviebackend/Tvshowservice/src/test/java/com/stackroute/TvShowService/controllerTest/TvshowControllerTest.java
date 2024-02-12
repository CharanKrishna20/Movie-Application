package com.stackroute.TvShowService.controllerTest;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.TvShowService.controller.TvShowController;
import com.stackroute.TvShowService.model.TvShow;
import com.stackroute.TvShowService.services.TvShowService;
import java.util.Collections;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@ExtendWith(MockitoExtension.class)
public class TvshowControllerTest {
  @Autowired
  private MockMvc mockMvc;
  @Mock
  private TvShowService tvShowService;
  @InjectMocks
  private TvShowController tvShowController;

  private TvShow tvShow;

  @BeforeEach
  public void setUp(){
    mockMvc = MockMvcBuilders.standaloneSetup(tvShowController).build();

    tvShow=new TvShow("Tv1", "you", "2022", "thriller", "you.jpg", "A thriller series",
        5.0d, Collections.singletonList("review"), "Director", Collections.singletonList("Writer"),
        "trailerLink", Collections.singletonList("netflix"), Collections.singletonList("Penn badgley"),
        Collections.singletonList("English"));
  }
  @AfterEach
  public void clean() {
    tvShow = null;
  }

  @Test
  public void addTvShow_Success() throws Exception {
    // Mocking the service method
    when(tvShowService.addTvShow(any(TvShow.class), any(MockMultipartFile.class))).thenReturn(tvShow);

    // Creating a mock multipart file
    MockMultipartFile file = new MockMultipartFile("file", "you.jpg", MediaType.IMAGE_JPEG_VALUE, "test file content".getBytes());

    mockMvc.perform(multipart("/admin/addTvShow")
            .file(file)
            .contentType(MediaType.MULTIPART_FORM_DATA)
            .content(new ObjectMapper().writeValueAsString(tvShow)))
        .andExpect(status().isCreated());
  }

  public static String convertToJson(final Object object) {
    String result = "";
    ObjectMapper om = new ObjectMapper();
    try {
      result = om.writeValueAsString(object);
    } catch (JsonProcessingException ex) {
      ex.printStackTrace();
      throw new RuntimeException();
    }
    return result;
  }

}
