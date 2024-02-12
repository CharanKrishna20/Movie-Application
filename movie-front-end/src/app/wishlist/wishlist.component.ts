import { Component, OnInit } from '@angular/core';
import { WishList } from '../models/wishlist';
import { Movie} from '../models/movie';
import { AuthService } from '../services/auth.service';
import { WishlistService } from '../services/wishlist.service';
import { TvShow } from '../models/tvShow';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit{


wishlist:Movie[]=[];
tvShowList:TvShow[]=[];


constructor(private authService:AuthService,private wishlistService:WishlistService, private snackBar:MatSnackBar){}
  ngOnInit() {
   this.getWishlist();
   this.getTvShowWishlist();
  }
  
getWishlist() {
  const currentUserEmail = this.authService.userEmailValue;
  if (currentUserEmail !== null) {
    this.wishlistService.getWishList(currentUserEmail).subscribe(
      (movies: Movie[] | Movie) => {
        this.wishlist = Array.isArray(movies) ? movies : [movies];
        console.log("Wishlist:", this.wishlist);
      },
      (error) => {
        console.error('Error fetching wishlist:', error);
      }
    );
  } else {
    console.error('User email is null');
  }
}
getTvShowWishlist() {
  const currentUserEmail = this.authService.userEmailValue;
  if (currentUserEmail !== null) {
    this.wishlistService.getShowWishList(currentUserEmail).subscribe(
      (tvShows: TvShow[] | TvShow) => {
        this.tvShowList = Array.isArray(tvShows) ? tvShows : [tvShows];
        console.log("Tv Show Wishlist:", this.tvShowList);
      },
      (error) => {
        console.error('Error fetching Tv Show Wishlist:', error);
      }
    );
  } else {
    console.error('User email is null');
  }
}
deleteItem(movieId:string) {
 this.wishlistService.deleteMovieFromList(movieId).subscribe(
  (success)=>{
    console.log("movie deleted succefully")
    // alert("movie deleted successfully....")
    this.snackBar.open("Movie removed from wishlist!", 'Close', {
      duration: 2000, // Adjust the duration as needed
      horizontalPosition: 'center', // You can change the position (e.g., 'start', 'end')
      verticalPosition: 'bottom',
      panelClass: ['success-snackbar'],
    });
    this.wishlist = this.wishlist.filter(movie => movie.movieId !== movieId);
  },
  (error)=>{
    console.log("error while deleting the movie")
  }
 )
  }
  deleteTvShowItem(tvShowId:string) {
    this.wishlistService.deleteShowFromList(tvShowId).subscribe(
     (success)=>{
       console.log("show deleted succefully")
      //  alert("Tv Show deleted successfully....")
       this.snackBar.open("Tv Show removed from wishlist!", 'Close', {
        duration: 2000, // Adjust the duration as needed
        horizontalPosition: 'center', // You can change the position (e.g., 'start', 'end')
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar'],
      });
       this.tvShowList = this.tvShowList.filter(tvShow => tvShow.tvShowId !== tvShowId);
     },
     (error)=>{
       console.log("error while deleting the movie")
     }
    )
     }

}

