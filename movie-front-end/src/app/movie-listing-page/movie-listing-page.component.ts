import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { Movie } from '../models/movie';
import { Genre } from '../models/genre';
import { Router } from '@angular/router';


@Component({
  selector: 'app-movie-listing-page',
  templateUrl: './movie-listing-page.component.html',
  styleUrl: './movie-listing-page.component.css'
})
export class MovieListingPageComponent implements OnInit{
  pageNumber: number = 0;
  showLoadButton: boolean = false;
  movies: Movie[] = [];
  // genres: Genre[] = [];
  selectedGenres: Set<string> = new Set<string>();
  allMovies: Movie[] = [];

  constructor(
    private imageService: ImageService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.fetchAllMovies();
  }

  // Fetch all movies
  fetchAllMovies() {
    this.imageService.getPaginatedMovies(this.pageNumber).subscribe(
      (success) => {
        if (success.length === 12) {
          this.showLoadButton = true;
        } else {
          this.showLoadButton = false;
        }

        success.forEach((newMovie) => {
          if (
            !this.movies.some(
              (existingMovie) => existingMovie.movieId === newMovie.movieId
            )
          ) {
            this.movies.push(newMovie);
          }
        });

        // Save all movies for reference
        this.allMovies = [...this.allMovies, ...success];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Search event
  onSearch(searchText: string) {
    if (searchText) {
      this.movies = this.allMovies.filter((movie) =>
        movie.movieTitle?.toLowerCase().includes(searchText.toLowerCase())
      );
    } else {
      this.pageNumber = 0;
      this.fetchAllMovies();
    }
  }

  // Filter by genres
  onSelectedGenresChange(selectedGenres: string[] | Set<string>): void {
    this.selectedGenres = new Set<string>(selectedGenres as string[]);
  
    // Rest of the method remains the same
    if (this.selectedGenres.size === 0) {
      // If no genres are selected, show all movies
      this.movies = this.allMovies.slice();
    } else {
      // Filter movies based on selected genres
      this.movies = this.allMovies.filter((movie) =>
        this.selectedGenres.has(movie.genre)
      );
    }
  }

  // Load more movies
  loadMoreMovies() {
    this.pageNumber++;
    this.fetchAllMovies();
  }



}
