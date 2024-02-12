import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Genre } from '../models/genre';
import { ImageService } from '../services/image.service';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit{
  genres: string[] = [];
  selectedGenres: string[] = [];
  genreCounts: Map<string, number> = new Map<string, number>();

  @Output() selectedGenresChange = new EventEmitter<string[]>();

  constructor(private movieService: ImageService) {}

  ngOnInit() {
    this.loadGenres(); 
  }

  loadGenres() {
    this.movieService.getAllGenres().subscribe(
      (genres) => {
        this.genres = genres;
        this.calculateGenreCounts();
      },
      (error) => {
        console.error('Error loading genres', error);
      }
    );
  }

  genreSelected(genre: string) {
    console.log('this is invoked');
    // Add or remove the selected genre from the array
    if (this.selectedGenres.includes(genre)) {
      this.selectedGenres = this.selectedGenres.filter((g) => g !== genre);
    } else {
      this.selectedGenres.push(genre);
    }

    // Emit the updated selected genres to the parent component
    this.selectedGenresChange.emit([...this.selectedGenres]);
  }
  getGenreCount(genre: string): number {
    return this.genreCounts.get(genre) || 0;
    console.log(this.genreCounts)
  }
  calculateGenreCounts(): void {
    this.genreCounts.clear();

    this.movieService.getMovies().subscribe(
      (movies) => {
        for (const movie of movies) {
          const count = this.genreCounts.get(movie.genre) || 0;
          this.genreCounts.set(movie.genre, count + 1);
        }
      },
      (error) => {
        console.error('Error loading movies', error);
      }
    );
  }
}


