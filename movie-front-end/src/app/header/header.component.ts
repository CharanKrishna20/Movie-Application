import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { LoginStatus } from '../models/loginstatus';
import { ActivatedRoute } from '@angular/router';
import { Genre } from '../models/genre';
import { User } from '../models/User';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class HeaderComponent  {
   isUserSubscribed: boolean = false;
  loggedInUsername: any;
  constructor(public authservice:AuthService){}
  ngOnInit(): void {

    this.authservice.isSubscribed.subscribe((subscribed) => {
      this.isUserSubscribed = subscribed;
      console.log("User Subscription status: ", this.isUserSubscribed)
;    });
   this.authservice.getUserName().subscribe((subscribed)=>{
    this.loggedInUsername=subscribed;
    console.log("header componet ..",this.loggedInUsername)
   })

  }


  userLogout() {
  this.authservice.logout();
  }

  toggleMenu() {
    const menu = document.querySelector('header ul') as HTMLElement | null;
  
    if (menu) {
      menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'block' : 'none';
    }
  }
  
}
