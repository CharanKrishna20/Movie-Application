import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private reviewSubject = new BehaviorSubject<string[]>([]);
  reviews$ = this.reviewSubject.asObservable();

  setReviews(reviews: string[]) {
    this.reviewSubject.next(reviews);
  }

  addReview(review: string) {
    const currentReviews = this.reviewSubject.value;
    const updatedReviews = [...currentReviews, review];
    this.reviewSubject.next(updatedReviews);
  }

  constructor() { }
}
