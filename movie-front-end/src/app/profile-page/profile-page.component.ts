import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit{
  user: User={
    userId: '',
    userEmailId: '',
    password: '',
    isVerified: false,
    registeredDate: new Date,
    userName: '',
    isSubscribed: false
  };
  isUserSubscribed: boolean = false;
  constructor(private userService:UserService,private activatedRoute: ActivatedRoute, public authService:AuthService){}
  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((param)=>{
      let id=param.get('id')??'';
      this.userService.getUserById(id).subscribe((data: any)=>{
        this.user=data;
        
      });
    });
    this.authService.isSubscribed.subscribe((subscribed) => {
      this.isUserSubscribed = subscribed;
      console.log("User Subscription status: ", this.isUserSubscribed)
;    });

  }

  // subscriptionPlans: SubscriptionPlan[] = [
  //   {
  //     name: 'Basic',
  //     price: 9.99,
  //     features: ['Access to basic content', 'One device at a time']
  //   },
  //   {
  //     name: 'Standard',
  //     price: 13.99,
  //     features: ['Access to HD content', 'Two devices at a time']
  //   },
  //   {
  //     name: 'Premium',
  //     price: 17.99,
  //     features: ['Access to 4K content', 'Four devices at a time', 'Ultra HD available']
  //   }
  // ];

  }

