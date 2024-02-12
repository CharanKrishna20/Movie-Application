package com.example.MovieService.model;

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
public class Movie {
    @Id
    private String movieId;
    private String movieTitle;
    private String releaseYear;
    private String genre;
    private String movieImagePath;
    private String movieDescription;
    private double movieRating;
    private List<String> movieReviews;
    private String movieDirector;
    private List<String> movieWriters;
    private String trailerLink;
    private List<String> streamingOn;
    private List<String> castAndCrew;
    private List<String> availableLanguages;


}
