import { Injectable } from '@angular/core';
import { WishList } from '../models/wishlist';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Movie } from '../models/movie';
import { User } from '../models/User';
import { TvShow } from '../models/tvShow';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  constructor(private http:HttpClient) { }
  wishListUrl:string= "http://localhost:4444/user"
  tvShowUrl:string="http://localhost:4444/tvShow"

  addMovieToList(movie: Movie) {
    const url = `${this.wishListUrl}/v1/addMovieToList`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'), // Include the token here
      }),
    };

    return this.http.post<User>(url, movie, httpOptions).pipe(
      catchError((error) => {
        console.error('Failed to add movie to wishlist:', error);
        throw error; // Re-throw the error to propagate it to the calling code
      })
    );
  }


  addshowtoList(tvshow: TvShow) {
    const url = `${this.tvShowUrl}/user/addTvShowToWishlist`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'), // Include the token here
      }),
    };

    return this.http.post<User>(url, tvshow, httpOptions).pipe(
      catchError((error) => {
        console.error('Failed to add tvshow to wishlist:', error);
        throw error; // Re-throw the error to propagate it to the calling code
      })
    );
    
  }

  getWishList(currentUserEmail:string):Observable<Movie>
  {
    console.log("........getwishlist movie.......")
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // Adjust the content type as needed
        'authorization': 'Bearer ' + localStorage.getItem('jwtToken')// Add your JWT token here
      })
    };
    return this.http.get<Movie>(this.wishListUrl+"/v1/getMovieList",httpOptions);
  }

  getShowWishList(currentUserEmail:string):Observable<TvShow>
  {
    console.log("........getwishlist tv show.......")
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // Adjust the content type as needed
        'authorization': 'Bearer ' + localStorage.getItem('jwtToken')// Add your JWT token here
      })
    };
    return this.http.get<TvShow>(this.tvShowUrl+"/user/tvShows",httpOptions);
  }

  createDefaultWishList(email:string){
    const emptyList:WishList={userId:email,movies:[]};
    return this.http.post<WishList>(`${this.wishListUrl}`,emptyList);
  }

  deleteMovieFromList(movieId: string): Observable<User> {
    const url = `${this.wishListUrl}/v1/deleteMovie/${movieId}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'), // Include the token here
      }),
    };

    return this.http.delete<User>(url, httpOptions).pipe(
      catchError((error) => {
        console.error('Failed to delete movie from wishlist:', error);
        throw error; // Re-throw the error to propagate it to the calling code
      })
    );
  }

  deleteShowFromList(tvShowId:string):Observable<User>{
    const url = `${this.tvShowUrl}/user/delete/${tvShowId}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'), // Include the token here
      }),
    };

    return this.http.delete<User>(url, httpOptions).pipe(
      catchError((error) => {
        console.error('Failed to delete show from wishlist:', error);
        throw error; // Re-throw the error to propagate it to the calling code
      })
    );
  }

  
}
