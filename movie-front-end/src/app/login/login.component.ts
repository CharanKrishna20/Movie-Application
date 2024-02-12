import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { UserService } from '../services/user.service';
import { trigger, transition, style, animate, keyframes, state } from '@angular/animations';
import { Router } from '@angular/router';
import { JwtDecoderService } from '../services/jwt-decoder.service';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    // Add your animations here
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
    trigger('bounce', [
      transition('* => *', [
        animate('200ms ease-in-out', keyframes([
          style({ transform: 'translateY(0)', offset: 0 }),
          style({ transform: 'translateY(-5px)', offset: 0.5 }),
          style({ transform: 'translateY(0)', offset: 1 }),
        ])),
      ]),
    ]),
    trigger('pulse', [
      state('normal', style({ transform: 'scale(1)' })),
      state('pulse', style({ transform: 'scale(1.1)' })),
      transition('normal <=> pulse', animate('500ms ease-in-out')),
    ]),
  ],
})
export class LoginComponent {
  loginForm:FormGroup;
  jwtToken: any;
  pulseState = 'normal';
  ngOnInit() {
    this.loginForm;
  }
  constructor(private fb:FormBuilder,private userservice:UserService, private route:Router,
    private jwtdecoder:JwtDecoderService,
    private authservice:AuthService, private snackBar: MatSnackBar){
    this.loginForm=this.fb.group({
      userEmailId:['',[Validators.required,Validators.email]],
      password:['',Validators.required]

    })
   }
   startPulseAnimation() {
    this.pulseState = 'pulse';
  }

  resetPulseAnimation() {
    this.pulseState = 'normal';
  }
   
  loginUser(){
    if (this.loginForm.invalid) {
     alert('Please fill in the required fields.');
    return;
     }
    console.log("reached login user method");
    let loginData = {
      userEmailId: this.loginForm.get('userEmailId')?.value,
     
      password: this.loginForm.get('password')?.value,
    };
    console.log("step 2");
    this.userservice.loginUser(loginData).subscribe(
      (success: any) => {
        const token  = success.key
        console.log(success);
        // alert('User logged in successfully');
        this.snackBar.open("You have logged in successfully", 'Close', {
          duration: 2000, // Adjust the duration as needed
          horizontalPosition: 'center', // You can change the position (e.g., 'start', 'end')
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
        // You can handle additional logic after successful login here
        localStorage.setItem('jwtToken',token);
        this.jwtToken=token;
        const userEmail:any = this.jwtdecoder.getUserEmail(this.jwtToken);
        console.log(userEmail)
        this.authservice.login(userEmail || '');
        this.authservice.updateSubscriptionStatus(success.subscriptionStatus || false);
        this.userservice.getUserById(userEmail).subscribe(
          (userData: User) => {
            const username = userData.userName;
            console.log('Username:', username);

            // Set the username in AuthService
            this.authservice.setUserName(username);
            console.log(username);

            // Your existing logic after successful login
          },
          (error) => {
            console.error('Error fetching user details:', error);
          }
        );
        //this.authservice.login();
        if(this.jwtToken)  
        this.route.navigate(['/movie-listing-page']);
        const userRole= this.jwtdecoder.getUserRole(this.jwtToken)
        console.log(".............."+ userRole)
        if(userRole=== 'ROLE_ADMIN'){
          this.route.navigate(['/admin-dashboard']);
        }
        else if(userRole === 'ROLE_USER'){
          this.route.navigate(['/home']);
        }
        else{
          console.log("not a registered user");
        }
        
      },
      (error: any) => {
        console.log(error);
        alert('Login failed. Please check your credentials.');
      }
    );
  };
}

