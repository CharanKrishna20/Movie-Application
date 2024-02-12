import { Component,NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { validateHeaderValue } from 'http';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css'
})
export class VerifyComponent {
  verifyForm:FormGroup;
  constructor(private fb:FormBuilder,
    private userservice:UserService,
    private route:ActivatedRoute,
    private router:Router,
    private snackBar:MatSnackBar,
    private zone:NgZone){

    this.verifyForm=this.fb.group({
      userEmailId:['',[Validators.required,Validators.email]],
      verificationCode:['',Validators.required]
    })
  }
  ngOnInit() {
    // Retrieve user email from route parameters
    this.route.params.subscribe((params) => {
      this.verifyForm.patchValue({ userEmailId: params['userEmailId'] });
    });
  }
  verifyEmail() {
    if (this.verifyForm.valid) {
      const verificationData = {
        userEmailId: this.verifyForm.value.userEmailId,
        verificationCode: this.verifyForm.value.verificationCode,
      };

      this.userservice.verifyUser(verificationData).subscribe(
        (success) => {
          this.zone.run(() => {
            // alert("Email verified successfully..");
            this.snackBar.open("Email verified successfully..", 'Close', {
              duration: 2000, // Adjust the duration as needed
              horizontalPosition: 'center', // You can change the position (e.g., 'start', 'end')
              verticalPosition: 'bottom',
              panelClass: ['success-snackbar'],
            });
            console.log('Email verified successfully:', success);
            // Redirect or perform other actions upon successful verification
              this.router.navigate(['/login'])
          });
        },
        (error) => {
          this.zone.run(() => {
            alert("Invalid verification code");
            console.error('Error during email verification:', error);
            // this.verifyForm.reset();
          });
        }
      );
        // (success) => {
        //   alert("Email verified successfully..")
        //   console.log('Email verified successfully:', success);
        //   // Redirect or perform other actions upon successful verification
        // },
        // (error) => {
        //   alert("invalid verification code")
        //   console.error('Error during email verification:', error);
        //   // this.verifyForm.reset();
          
        //   // Display a snackbar with the error message
        //   // this.snackbar.open(error.error.body, 'Close', {
        //   //   duration: 5000, // Duration in milliseconds
        //   // });
          
        // }
        

      
    }
   
  }


}

