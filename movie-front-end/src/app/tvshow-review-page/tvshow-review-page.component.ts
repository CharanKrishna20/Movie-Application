import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageService } from '../services/image.service';
import { ReviewsService } from '../services/reviews.service';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tvshow-review-page',
  templateUrl: './tvshow-review-page.component.html',
  styleUrl: './tvshow-review-page.component.css'
})
export class TvshowReviewPageComponent {
  constructor(
    private dialogRef: MatDialogRef<TvshowReviewPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { tvShowId: string },
    private imageservice:ImageService,
    private reviewService:ReviewsService,
    private authService:AuthService, private snackBar:MatSnackBar
  ) {}
    
  addTvShowReview() {
  if (!this.authService.isLoggedInValue) {
   
    alert('Please log in to add a review.');
    return;
  }
  this.imageservice.addReviewToTvShow(this.data.tvShowId,this.reviewText).subscribe(
    (reviews)=>{
      console.log('review added succefully',reviews);
      this.snackBar.open("Review added successfully", 'Close', {
        duration: 2000, // Adjust the duration as needed
        horizontalPosition: 'center', // You can change the position (e.g., 'start', 'end')
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar'],
      });
      this.imageservice.getAllReviewsOfMovie(this.data.tvShowId).subscribe((allReviews)=>{
        // this.reviewService.setReviews(allReviews)
        this.dialogRef.close();
      })
    

      this.dialogRef.close();
    },
    (error)=>{
      console.log('review adding failed',error)
    }
  )

}
reviewText:string='';
reviewAdded: EventEmitter<string> = new EventEmitter<string>();
}
