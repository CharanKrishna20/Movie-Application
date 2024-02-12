import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ImageService } from '../services/image.service';
import { LoginStatus } from '../models/loginstatus';
import { Movie } from '../models/movie';
import { WishList } from '../models/wishlist';
import { WishlistService } from '../services/wishlist.service';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ReviewPageComponent } from '../review-page/review-page.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { get } from 'http';
import { ReviewsService } from '../services/reviews.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-movie-description-page',
  templateUrl: './movie-description-page.component.html',
  styleUrl: './movie-description-page.component.css'
})
export class MovieDescriptionPageComponent {
  @Input()
  movie!: Movie;
  isUserSubscribed: boolean = false;
openReviewDialog(movieId: string) {
  if(this.authService.isLoggedIn){
   const dialogRef=this.dialog.open(ReviewPageComponent,{
    width:'400px',
    data:{movieId}
   });
   dialogRef.componentInstance.reviewAdded.subscribe((reviewText: string) => {
    // Add the review to the movie's reviews
    this.movie!.movieReviews!.push(reviewText);
  });
    dialogRef.afterClosed().subscribe(result=>{
      console.log('the dialog box closed');
      
      this.activatedRoute.paramMap.subscribe((param)=>{
        let id=param.get('id')??'';
        this.imageService.getMovieById(id).subscribe((data: any)=>{
          this.movie=data;
          
        });
      });
    })
  }
  else{
    alert("Please login to add review");
  }
}


constructor(
  private activatedRoute: ActivatedRoute,private imageService:ImageService,private router:Router,
  private wishlistservice:WishlistService,
  public authService:AuthService,private dialog:MatDialog,
  private sanitizer:DomSanitizer,
  private reviewService:ReviewsService,
  private snackBar:MatSnackBar
  ){}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param)=>{
      let id=param.get('id')??'';
      this.imageService.getMovieById(id).subscribe((data: any)=>{
        this.movie=data;
        
      });
      this.authService.isSubscribed.subscribe((subscribed) => {
        this.isUserSubscribed = subscribed;
        console.log("User Subscription status: ", this.isUserSubscribed)
  ;    });
    });
    this.reviewService.reviews$.subscribe((reviews) => {
      // Update only if there are reviews
      if (reviews.length > 0) {
        this.movie.movieReviews = reviews;
      }
    });
   
  
// this.loginStatus=JSON.parse(
  
//   localStorage.getItem('loginStatus')?? JSON.stringify({isLoggedIn:false,id:'',role:''})
// );

}
// get sanitizedTrailerLink(): SafeResourceUrl {
//   return this.sanitizer.bypassSecurityTrustResourceUrl(this.movie.trailerLink);
// }
get sanitizedTrailerLink(): SafeResourceUrl {
  const videoId = this.extractVideoId(this.movie.trailerLink);
  const embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  return embedUrl;
}

private extractVideoId(url: string): string {
  // Use a regular expression or other method to extract the YouTube video ID from the URL
  // Example: https://www.youtube.com/watch?v=VIDEO_ID
  const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : '';
}

  addMovieToWishlist() {
    const movie:Movie={
      movieImagePath: this.movie.movieImagePath,
      movieId: this.movie.movieId,
      movieTitle: this.movie.movieTitle,
      movieDescription: this.movie.movieDescription,
      movieRating: this.movie.movieRating,
      genre: this.movie.genre,
      releaseYear: this.movie.releaseYear,
      movieDirector: '',
      movieWriters: [],
      trailerLink: '',
      streamingOn: [],
      castAndCrew: [],
      availableLanguages: []
    }
    console.log("Movie to ", JSON.stringify(movie));
    if (this.authService.isLoggedInValue) {
      const userEmail = this.authService.userEmailValue;
          console.log(userEmail);
      if (userEmail && this.movie.movieId) {
        this.wishlistservice.addMovieToList(this.movie).subscribe(
          (response) => {
            console.log('Movie added to wishlist successfully:', response);
            this.snackBar.open("Movie added to wishlist successfully:", 'Close', {
              duration: 2000, // Adjust the duration as needed
              horizontalPosition: 'center', // You can change the position (e.g., 'start', 'end')
              verticalPosition: 'bottom',
              panelClass: ['success-snackbar'],
            });
   
          },
          (error) => {
            if (error instanceof HttpErrorResponse) {
              console.error('Status:', error.status);
              console.error('Status Text:', error.statusText);
              console.error('Body:', error.error);
            }
          }
        );
      } else {
        console.error('User email or movie details are missing.');
      }
     
    } else {
      this.snackBar.open("Please login to add a Review", 'Close', {
        duration: 2000, // Adjust the duration as needed
        horizontalPosition: 'center', // You can change the position (e.g., 'start', 'end')
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar'],
      });
      this.router.navigate(['/login']);
    }  
}
download(){
  this.snackBar.open("Video Downloaded", 'Close', {
    duration: 2000, // Adjust the duration as needed
    horizontalPosition: 'center', // You can change the position (e.g., 'start', 'end')
    verticalPosition: 'bottom',
    panelClass: ['success-snackbar'],
  });
}
}



