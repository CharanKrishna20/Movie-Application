import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userName = new BehaviorSubject<string | null>(null);
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userEmail = new BehaviorSubject<string | null>(null);
  private subscribed = new BehaviorSubject<boolean>(false);
  constructor(private userService:UserService, private route:Router,private snackBar:MatSnackBar){
    this.checkSubscriptionStatus();
  }
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  get userEmailValue() {
    return this.userEmail.value;
  }
  get isSubscribed(){
    return this.subscribed.asObservable();
  }
      login(userEmail:string) {
        this.userEmail.next(userEmail);
        this.loggedIn.next(true);

        this.subscribed.next(false);
        this.checkSubscriptionStatus();
      }
      get isLoggedInValue() {
        return this.loggedIn.value;
      }

      logout() {
        this.route.navigate(['/home']);
        this.snackBar.open("You have logged out, Please login again!!", 'Close', {
          duration: 2000, // Adjust the duration as needed
          horizontalPosition: 'center', // You can change the position (e.g., 'start', 'end')
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar'],
        });
        localStorage.removeItem('jwtToken');
        this.userEmail.next(' ');
        // Notify subscribers about the logout
        this.loggedIn.next(false);
        this.subscribed.next(false);
      }
      updateSubscriptionStatus(status: boolean) {
        console.log('Updating subscription status to:', status);
        this.subscribed.next(status);
      }
      setUserName(userName: string | null) {
        // Check if userName is not null before setting it
        if (userName !== null) {
          this.userName.next(userName);
        }
      }
      getUserName() {
        return this.userName.asObservable();
      }
      private checkSubscriptionStatus() {
        const userEmail = this.userEmail.value;
        if (userEmail) {
          // Fetch the subscription status from the backend using UserService
          this.userService.getUserSubscriptionStatus().subscribe(
            (subscriptionStatus: boolean) => {
              console.log('Subscription status from backend:', subscriptionStatus);
              this.subscribed.next(subscriptionStatus);
            },
            (error) => {
              console.error('Error fetching subscription status:', error);
            }
          );
        }
      }
}

  


