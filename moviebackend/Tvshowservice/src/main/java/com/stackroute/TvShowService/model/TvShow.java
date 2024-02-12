package com.stackroute.TvShowService.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document
public class TvShow {
    @Id
    private String tvShowId;
    private String showTitle;
    private String releaseYear;
    private String genre;
    private String showImagePath;
    private String showDescription;
    private double showRating;
    private List<String> showReviews;
    private String showDirector;
    private List<String> showWriters;
    private String trailerLink;
    private List<String> streamingOn;
    private List<String> castAndCrew;
    private List<String> availableLanguages;
}
