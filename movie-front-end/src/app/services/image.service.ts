import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput, catchError, map, tap, throwError } from 'rxjs';
import { Movie } from '../models/movie';
import { Genre } from '../models/genre';
import { TvShow } from '../models/tvShow';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
 
  private imageUrl = 'http://localhost:4444/movies';
  private tvshowUrl = 'http://localhost:4444/tvShow';
  handleError:
    | ((err: any, caught: Observable<Movie>) => ObservableInput<any>)
    | any;
  constructor(private httpClient: HttpClient) {}

  getAllGenres(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.imageUrl}/allGenres`);
  }
  getAllMoviesByGenre(genre: string): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(`${this.imageUrl}/genre/${genre}`);
   }
   getAllTvShowGenres(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.tvshowUrl}/allGenres`)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);

          // You can customize error handling based on your requirements
          // For example, you might want to log the error to a server or show a user-friendly message

          // Return an empty array as a default value, but you can also throw an error or return a different default value
          return [];
        })
      );
  }
  // getAllTvShowGenres(): Observable<string[]> {
  //   return this.httpClient.get<string[]>(`${this.tvshowUrl}/allGenres`);
  // }
  getAllTvShowsByGenre(genre: string): Observable<TvShow[]> {
    return this.httpClient.get<TvShow[]>(`${this.tvshowUrl}/genre/${genre}`);
  }
  addMovie(movieData: any, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('movieTitle', movieData.movieTitle);
    formData.append('releaseYear', movieData.releaseYear);
    formData.append('genre', movieData.genre);
    formData.append('movieDescription', movieData.movieDescription);
    formData.append('movieRating', movieData.movieRating);
    formData.append('movieDirector', movieData.movieDirector);
    formData.append('movieWriters', movieData.movieWriters);
    formData.append('trailerLink', movieData.trailerLink);
    formData.append('streamingOn', movieData.streamingOn);
    formData.append('castAndCrew', movieData.castAndCrew);
    formData.append('availableLanguages', movieData.availableLanguages);
    formData.append('file', file, file.name);
    return this.httpClient.post(`${this.imageUrl}/admin/addMovie`, formData);
  }

  addTvShow(TvShowData: any, file: File): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('showTitle', TvShowData.showTitle);
    formData.append('releaseYear', TvShowData.releaseYear);
    formData.append('genre', TvShowData.genre);
    formData.append('showDescription', TvShowData.showDescription);
    formData.append('showRating', TvShowData.showRating);
    formData.append('showDirector', TvShowData.showDirector);
    formData.append('showWriters', TvShowData.showWriters);
    formData.append('trailerLink', TvShowData.trailerLink);
    formData.append('file', file, file.name);
    formData.append('streamingOn', TvShowData.streamingOn);
    formData.append('castAndCrew', TvShowData.castAndCrew);
    formData.append('availableLanguages', TvShowData.availableLanguages);

    return this.httpClient.post(`${this.tvshowUrl}/admin/addTvShow`, formData);
  }

  getTvShows(): Observable<TvShow[]> {
    return this.httpClient.get<TvShow[]>(this.tvshowUrl + '/all');
  }
  getPaginatedTvShows(pageNumber:any): Observable<TvShow[]> {
    return this.httpClient.get<TvShow[]>(this.tvshowUrl + '/pages?pageNumber='+pageNumber);
  }
  getMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.imageUrl + '/all');
  }
  getPaginatedMovies(pageNumber:any): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.imageUrl + '/pages?pageNumber='+pageNumber);
  }

  /*this is for deleting movie*/

  deleteMovie(movieId: string): Observable<any> {
    console.log('delete movie service invoked');
    const deleteUrl = `${this.imageUrl}/admin/deleteMovie/${movieId}`;
    return this.httpClient.delete<Movie>(deleteUrl);
  }

  deleteTvShow(tvShowId: string): Observable<any> {
    console.log('delete movie service invoked');
    const deleteUrl = `${this.tvshowUrl}/admin/deleteTvShow/${tvShowId}`;
    return this.httpClient.delete<TvShow>(deleteUrl);
  }

  /*this is for get movie by id*/
  getMovieById(movieId: string): Observable<Movie> {
    console.log('method invoked');
    const url = `${this.imageUrl}/admin/${movieId}`;
    return this.httpClient.get<Movie>(url);
  }
  getTvShowById(tvShowId: string): Observable<TvShow> {
    console.log('method invoked');
    const url = `${this.tvshowUrl}/admin/${tvShowId}`;
    return this.httpClient.get<TvShow>(url);
  }
  /*this is for update movie*/
  modifyMovie(movieData: any, file: File | null): Observable<any> {
    console.log('Modify Movie called {}', movieData);
    const formData: FormData = new FormData();
    formData.append('movieId', movieData.movieId);
    formData.append('movieTitle', movieData.movieTitle);
    formData.append('releaseYear', movieData.releaseYear);
    formData.append('genre', movieData.genre);
    formData.append('movieDescription', movieData.movieDescription);
    formData.append('movieRating', movieData.movieRating);
    formData.append('movieDirector', movieData.movieDirector);
    formData.append('movieWriters', movieData.movieWriters);
    formData.append('trailerLink', movieData.trailerLink);
    formData.append('streamingOn', movieData.streamingOn);
    formData.append('castAndCrew', movieData.castAndCrew);
    formData.append('availableLanguages', movieData.availableLanguages);
    if (file) {
      formData.append('file', file, file.name);
    }
    console.log('...........' + formData);
    const url = `${this.imageUrl}/admin/updateMovie`;
    return this.httpClient.post(url, formData);
  }

  modifyTvShow(TvShowData: any, file: File | null): Observable<any> {
    console.log('Modify TvShow called {}', TvShowData);
    const formData: FormData = new FormData();
    formData.append('tvShowId', TvShowData.tvShowId);
    formData.append('showTitle', TvShowData.showTitle);
    formData.append('releaseYear', TvShowData.releaseYear);
    formData.append('genre', TvShowData.genre);
    formData.append('showDescription', TvShowData.showDescription);
    formData.append('showRating', TvShowData.showRating);
    formData.append('showDirector', TvShowData.showDirector);
    formData.append('showWriters', TvShowData.showWriters);
    formData.append('trailerLink', TvShowData.trailerLink);
    formData.append('streamingOn', TvShowData.streamingOn);
    formData.append('castAndCrew', TvShowData.castAndCrew);
    formData.append('availableLanguages', TvShowData.availableLanguages);
    if (file) {
      formData.append('file', file, file.name);
    }
    console.log('...........' + formData);
    const url = `${this.tvshowUrl}/admin/updateTvShow`;
    return this.httpClient.post(url, formData);
  }

  // addReviewToMovie(movieId: string, review: string): Observable<any> {
  //   const url = `${this.imageUrl}/${movieId}/reviews`;
    
   
  //   return this.httpClient.post(url, { text: review }).pipe(
  //     map((response: any) => {
  //       return response.reviews; 
  //     }),
  //     catchError((error) => {
  //       console.error('Failed to add review to movie:', error);
  //       return throwError(error);
  //     })
  //   );
  // }
  addReviewToMovie(movieId: string, review: string): Observable<any> {
    console.log(review + '..service');
    const url = `${this.imageUrl}/${movieId}/reviews`;
    return this.httpClient.post(url, review);
  }
  getAllReviewsOfMovie(movieId:string):Observable<any>{
    console.log('allreviws...');
    const url = `${this.imageUrl}/${movieId}/allReviews`;
    return this.httpClient.get<string[]>(url);

    
  }

  addReviewToTvShow(tvShowId: string, review: string): Observable<any> {
    console.log(review + '..service');
    const url = `${this.tvshowUrl}/${tvShowId}/reviews`;
    return this.httpClient.post(url, review);
  }
}
