import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieEditService {

  private movieUpdatedSource = new Subject<Movie>();
  movieUpdated$ = this.movieUpdatedSource.asObservable();

  private movieAddedSource = new Subject<Movie>();
  movieAdded$ = this.movieAddedSource.asObservable();

  announceMovieUpdated(movie: Movie) {
    this.movieUpdatedSource.next(movie);
  }

  announceMovieAdded(movie: Movie) {
    this.movieAddedSource.next(movie);
  }
  constructor() { }
}
