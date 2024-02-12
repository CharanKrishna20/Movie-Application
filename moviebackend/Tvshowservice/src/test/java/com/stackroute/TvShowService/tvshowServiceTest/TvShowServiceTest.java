package com.stackroute.TvShowService.tvshowServiceTest;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.stackroute.TvShowService.exceptions.TvShowAlreadyExistsException;
import com.stackroute.TvShowService.exceptions.TvShowNotFoundException;
import com.stackroute.TvShowService.model.TvShow;
import com.stackroute.TvShowService.repository.TvShowRepository;
import com.stackroute.TvShowService.services.TvShowService;
import com.stackroute.TvShowService.services.TvShowServiceImpl;
import java.io.File;
import java.io.IOException;
import java.util.Collections;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

@ExtendWith(MockitoExtension.class)
public class TvShowServiceTest {
  @Mock
  private TvShowRepository tvShowRepository;
  @InjectMocks
  private TvShowServiceImpl tvShowService;

  private TvShow tvShow;

  @BeforeEach
  public void Setup() throws TvShowAlreadyExistsException {
    tvShow=new TvShow("Tv1", "you", "2022", "thriller", "you.jpg", "A thriller series",
        5.0d, Collections.singletonList("review"), "Director", Collections.singletonList("Writer"),
        "trailerLink", Collections.singletonList("netflix"), Collections.singletonList("Penn badgley"),
        Collections.singletonList("English"));
    MockMultipartFile file = new MockMultipartFile("file", "you.jpg", "image/jpg", "test file content".getBytes());

  }

  @AfterEach
  public void clean() {
    tvShow = null;
  }
  @Test
  public void testServiceAddTvShowSuccess() throws TvShowAlreadyExistsException {
    when(tvShowRepository.findByshowTitle(tvShow.getShowTitle())).thenReturn(Optional.empty());
    when(tvShowRepository.save(tvShow)).thenReturn(tvShow);
    MockMultipartFile file = new MockMultipartFile("file", "you.jpg", "image/jpg", "test file content".getBytes());
    tvShowService.addTvShow(tvShow, file);

    verify(tvShowRepository, times(1)).findByshowTitle(tvShow.getShowTitle());
    verify(tvShowRepository, times(2)).save(any(TvShow.class));
  }


  @Test
  public void testServiceAddTvShowFailure()throws TvShowAlreadyExistsException{
    MockMultipartFile file = new MockMultipartFile("file", "you.jpg", "image/jpg", "test file content".getBytes());
    when(tvShowRepository.findByshowTitle(tvShow.getShowTitle())).thenReturn(Optional.of(tvShow));
    assertThrows(TvShowAlreadyExistsException.class,()->tvShowService.addTvShow(tvShow,file));
    verify(tvShowRepository,times(0)).insert(tvShow);
    verify(tvShowRepository,times(1)).findByshowTitle(tvShow.getShowTitle());
  }
  @Test
  public void testUpdateTvShowSuccess() throws TvShowNotFoundException {

    when(tvShowRepository.findById(tvShow.getTvShowId())).thenReturn(Optional.of(tvShow));
    when(tvShowRepository.save(any(TvShow.class))).thenReturn(tvShow);

    MockMultipartFile file = new MockMultipartFile("file", "test-file.jpg", "image/jpeg", "test file content".getBytes());

    TvShow updatedTvShow = tvShowService.updateTvShow(tvShow, file);

    // Verify interactions
    verify(tvShowRepository, times(1)).findById(tvShow.getTvShowId());
    verify(tvShowRepository, times(2)).save(any(TvShow.class));
    assert updatedTvShow != null;

  }

  @Test
  public void testUpdateShowFailure()throws TvShowNotFoundException{
    MockMultipartFile file = new MockMultipartFile("file", "test-file.jpg", "image/jpeg", "test file content".getBytes());
    when(tvShowRepository.findById(tvShow.getTvShowId())).thenReturn(Optional.ofNullable(null));
    assertThrows(TvShowNotFoundException.class,()->tvShowService.updateTvShow(tvShow,file));
    verify(tvShowRepository,times(1)).findById(tvShow.getTvShowId());
    verify(tvShowRepository,times(0)).save(tvShow);
  }

  @Test
  public void testDeleteShowSuccess()throws TvShowNotFoundException{
    when(tvShowRepository.findById(tvShow.getTvShowId())).thenReturn(Optional.ofNullable(null));
    assertThrows(TvShowNotFoundException.class,()->tvShowService.getTvShowById(tvShow.getTvShowId()));
    verify(tvShowRepository,times(1)).findById(tvShow.getTvShowId());
    verify(tvShowRepository,times(0)).deleteById(tvShow.getTvShowId());
  }

  @Test
  public void testdeleteFailure()throws TvShowNotFoundException{
    when(tvShowRepository.findById(tvShow.getTvShowId())).thenReturn(Optional.of(tvShow));
    tvShowService.deleteTvShow(tvShow.getTvShowId());
    verify(tvShowRepository,times(1)).findById(tvShow.getTvShowId());
    verify(tvShowRepository,times(1)).deleteById(tvShow.getTvShowId());
  }



}
