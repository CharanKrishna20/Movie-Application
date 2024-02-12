import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { NavigationExtras, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  forgotPasswordForm!: FormGroup;
  


  constructor(private fb: FormBuilder,private userService:UserService,private router:Router,private snackBar:MatSnackBar) { }
  

ngOnInit(): void {
  this.buildForm();
}

buildForm(): void {
  this.forgotPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });
}

// forgotPassword(): void {
//   const userData = {
//     userEmailId: this.forgotPasswordForm.value.userEmailId
   
//   };
//   console.log('Forgot password method called');
//   const email = this.forgotPasswordForm.get('email')?.value;
//   console.log('Email:', email);
  
//   this.userService.forgotPassword(email).subscribe(
//     (response) => {
//       console.log('Response from forgotPassword:', response);
      
//       if (response && response.message === 'Mail sent successfully') {
//         console.log('Mail sent successfully');
        
//         // Debugging purposes
//         console.log('Navigating to /reset-verify');
        
//         alert('Reset code sent successfully. Please enter the code.');
//         this.router.navigate(['/reset-verify', { userEmailId: userData.userEmailId }]);
//       } else {
//         console.error('Error during forgot password:', response);
//       }
//     },
//     (error) => {
//       console.log('Forgot password component error', error);
//     }
//   );
// }
forgotPassword(): void {
  const userEmailId = this.forgotPasswordForm.get('email')?.value;

  this.userService.forgotPassword(userEmailId).subscribe(
    (response) => {
      console.log('Response from forgotPassword:', response);
      //  const navigationExtras: NavigationExtras = {
      //   state: {
      //     userEmailId: userEmailId
      //    }
      // };
      // rest of your code...
      console.log('Navigating to /reset-verify');
        
      // alert('Reset code sent successfully. Please enter the code.');
      this.snackBar.open("Reset code sent successfully. Please enter the code", 'Close', {
        duration: 2000, // Adjust the duration as needed
        horizontalPosition: 'center', // You can change the position (e.g., 'start', 'end')
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar'],
      });
     // this.router.navigate(['/reset-verify'], { state: { userEmailId: userEmailId } });
      this.router.navigate(['/reset-verify', { userEmailId: userEmailId }]);
    },
    (error) => {
      console.log('Forgot password component error', error);
      const errorMessage = error && error.message ? error.message : 'Unknown error';
      alert(`Error during forgot password: ${errorMessage}`);
    }
  );
}
}
