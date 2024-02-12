import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-resetverify',
  templateUrl: './resetverify.component.html',
  styleUrl: './resetverify.component.css'
})
export class ResetverifyComponent implements OnInit {
  verifyForm:FormGroup;
  userEmailId: any;
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

    // this.route.params.subscribe((params) => {
    //   this.userEmailId = params['userEmailId'];
    //   // Initialize the form with userEmailId
    //   this.verifyForm.patchValue({ userEmailId: this.userEmailId });
    // });
    // const routerState = this.router.routerState;
    // const rootSnapshot = routerState.snapshot.root;
    // const navigationState = this.extractState(rootSnapshot);

    // this.userEmailId = navigationState ? navigationState.userEmailId : null;

    // // Initialize the form with userEmailId
    // this.verifyForm.patchValue({ userEmailId: this.userEmailId });
  }
  // private extractState(snapshot: any): any {
  //   if (snapshot.firstChild) {
  //     return this.extractState(snapshot.firstChild);
  //   } else {
  //     return snapshot.data.state;
  //   }
  // }
  verifyResetCode() {
    const email = this.verifyForm.get('userEmailId')?.value;

    if (this.verifyForm.valid) {
      const verificationData = {
        userEmailId: this.verifyForm.value.userEmailId,
        verificationCode: this.verifyForm.value.verificationCode,
      };

      this.userservice.resetCodeVerify(verificationData).subscribe(
        (success) => {
          this.zone.run(() => {
            // alert("Email verified successfully..");
            this.snackBar.open("Code Verified successfully!", 'Close', {
              duration: 2000, // Adjust the duration as needed
              horizontalPosition: 'center', // You can change the position (e.g., 'start', 'end')
              verticalPosition: 'bottom',
              panelClass: ['success-snackbar'],
            });
            console.log('Password reset  code verified successfully:', success);
            // Redirect or perform other actions upon successful verification
              this.router.navigate(['/reset-password', { userEmailId:email }]);
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
      
    }
   
  }
}
