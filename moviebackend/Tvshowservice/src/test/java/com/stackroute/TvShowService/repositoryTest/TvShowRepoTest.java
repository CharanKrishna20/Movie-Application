package com.stackroute.TvShowService.repositoryTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

//import com.mongodb.DuplicateKeyException;
import com.stackroute.TvShowService.exceptions.TvShowAlreadyExistsException;
import com.stackroute.TvShowService.model.TvShow;
import com.stackroute.TvShowService.repository.TvShowRepository;
import java.util.Arrays;
import java.util.Collections;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@DataMongoTest
@ExtendWith(SpringExtension.class)
public class TvShowRepoTest {
  @Autowired
  private TvShowRepository tvShowRepository;

  private TvShow tvShow;

  @BeforeEach
  public void Setup() {
    tvShow=new TvShow("Tv1", "you", "2022", "thriller", "you.jpg", "A thriller series",
        5.0d, Collections.singletonList("review"), "Director", Collections.singletonList("Writer"),
        "trailerLink", Collections.singletonList("netflix"), Collections.singletonList("Penn badgley"),
        Collections.singletonList("English"));

    tvShowRepository.save(tvShow);

  }

  @AfterEach
  public void clean() {
    tvShow = null;

  }

  @Test
  public void testFindAll(){
    //assertEquals(1,tvShowRepository.findAll().size());
//    assertEquals("you",tvShowRepository.findAll().get(0).getShowTitle());
  }

  @Test
  public void testInsertFail(){
    TvShow tvShow1=new TvShow("Tv1", "you", "2022", "thriller", "you.jpg", "A thriller series",
        5.0d, Collections.singletonList("review"), "Director", Collections.singletonList("Writer"),
        "trailerLink", Collections.singletonList("netflix"), Collections.singletonList("Penn badgley"),
        Collections.singletonList("English"));
    tvShowRepository.save(tvShow1);
    assertThrows(DuplicateKeyException.class,()->tvShowRepository.insert(tvShow1));
  }
  @Test
  public void testInsertSuccess(){
    TvShow tvShow2=new TvShow("Tv2", "squid game", "2022", "thriller", "you.jpg", "A thriller series",
        5.0d, Collections.singletonList("review"), "Director", Collections.singletonList("Writer"),
        "trailerLink", Collections.singletonList("netflix"), Collections.singletonList("Penn badgley"),
        Collections.singletonList("English"));
    tvShowRepository.save(tvShow2);
//    assertEquals(2,tvShowRepository.findAll().size());
//    assertEquals(Arrays.asList(tvShow,tvShow2),tvShowRepository.findAll());
    assertEquals(tvShow2,tvShowRepository.findById("Tv2").get());
  }

}
