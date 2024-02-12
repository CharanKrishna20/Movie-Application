import { Component, Input } from '@angular/core';
import { TvShow } from '../models/tvShow';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../services/image.service';
import { WishlistService } from '../services/wishlist.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { ReviewPageComponent } from '../review-page/review-page.component';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../models/User';
import { TvshowReviewPageComponent } from '../tvshow-review-page/tvshow-review-page.component';


@Component({
  selector: 'app-tvshow-description-page',
  templateUrl: './tvshow-description-page.component.html',
  styleUrl: './tvshow-description-page.component.css'
})
export class TvshowDescriptionPageComponent {
   @Input()
    tvshow!: TvShow;
    isUserSubscribed: boolean = false;
    openReviewDialog(tvShowId: string) {
      if(this.authService.isLoggedIn){
        const dialogRef=this.dialog.open(TvshowReviewPageComponent,{
         width:'400px',
         data:{tvShowId}
        });
        dialogRef.componentInstance.reviewAdded.subscribe((reviewText: string) => {
         // Add the review to the movie's reviews
         this.tvshow!.showReviews!.push(reviewText);
       });
         dialogRef.afterClosed().subscribe(result=>{
           console.log('the dialog box closed');
           
           this.activatedRoute.paramMap.subscribe((param)=>{
             let id=param.get('id')??'';
             this.imageService.getTvShowById(id).subscribe((data: any)=>{
               this.tvshow=data;
               
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
  private sanitizer:DomSanitizer,
  public authService:AuthService,private dialog:MatDialog, private snackBar: MatSnackBar
  ){}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param)=>{
      let id=param.get('id')??'';
      this.imageService.getTvShowById(id).subscribe((data: any)=>{
        this.tvshow=data;
        
      });
    });
    this.authService.isSubscribed.subscribe((subscribed) => {
      this.isUserSubscribed = subscribed;
      console.log("User Subscription status: ", this.isUserSubscribed)
;    });
  
}
get sanitizedTrailerLink(): SafeResourceUrl {
  const videoId = this.extractVideoId(this.tvshow.trailerLink);
  const embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  return embedUrl;
}

private extractVideoId(url: string): string {
  // Use a regular expression or other method to extract the YouTube video ID from the URL
  // Example: https://www.youtube.com/watch?v=VIDEO_ID
  const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : '';
}

  addShowToWishlist() {
    const tvshow:TvShow={
      showImagePath: this.tvshow.showImagePath,
      tvShowId: this.tvshow.tvShowId,
      showTitle: this.tvshow.showTitle,
      showDescription: this.tvshow.showDescription,
      showRating: this.tvshow.showRating,
      genre: this.tvshow.genre,
      releaseYear: this.tvshow.releaseYear,
      showDirector: '',
      showWriters: [],
      trailerLink: '',
      streamingOn: [],
      castAndCrew: [],
      availableLanguages: []
    }
    console.log("Movie to ", JSON.stringify(tvshow));
    if (this.authService.isLoggedInValue) {
      const userEmail = this.authService.userEmailValue;
          console.log(userEmail);
      if (userEmail && this.tvshow.tvShowId) {
        this.wishlistservice.addshowtoList(this.tvshow).subscribe(
          (response) => {
            console.log('tvshow added to wishlist successfully:', response);
            this.snackBar.open("Tv Show added to wishlist successfully:", 'Close', {
              duration: 2000, // Adjust the duration as needed
              horizontalPosition: 'center', // You can change the position (e.g., 'start', 'end')
              verticalPosition: 'bottom',
              panelClass: ['success-snackbar'],
            });
          },
          (error) => {
            console.error('Failed to add tvshow to wishlist:', error);
           
          }
        );
      } else {
        console.error('User email or tvshow details are missing.');
       
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
