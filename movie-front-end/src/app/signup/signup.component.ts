import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, UrlTree } from '@angular/router';
import { trigger, transition, animate, keyframes, style } from '@angular/animations';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  animations: [
    // Add your animations here
    trigger('bounce', [
      transition('* => *', [
        animate('1000ms ease-in-out', keyframes([
          style({ transform: 'translateY(0)', offset: 0 }),
          style({ transform: 'translateY(-5px)', offset: 0.5 }),
          style({ transform: 'translateY(0)', offset: 1 }),
        ])),
      ]),
    ]),
  ],
})
export class SignupComponent {
  signupForm:FormGroup;
  bounceState = 'normal';

  constructor(private fb:FormBuilder,private userservice:UserService,private route:Router, private snackBar: MatSnackBar){
    this.signupForm = this.fb.group({
      userName: ['', [Validators.required]],
      userEmailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
    };
    private passwordMatchValidator(form: FormGroup): null | object {
      const password = form.get('password')?.value;
      const confirmPassword = form.get('confirmPassword')?.value;
  
      return password === confirmPassword ? null : { passwordMismatch: true };
    }
    private passwordPatternValidator() {
      return (control:any) => {
        const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(control.value);
        return isValid ? null : { invalidPassword: true };
      };
    }
  

  signupUser() {
    if (this.signupForm.valid) {
      const userId = generateUserId(); 
      const userData = {
        userName:this.signupForm.value.userName,
        userEmailId: this.signupForm.value.userEmailId,
        password: this.signupForm.value.password,
        userId: userId,
      };
    
  
      this.userservice.signupUser(userData).subscribe(
        (response) => {
          // alert("Please verify the email to proceed further");
          this.snackBar.open("Please verify the email to proceed further", 'Close', {
            duration: 2000, // Adjust the duration as needed
            horizontalPosition: 'center', // You can change the position (e.g., 'start', 'end')
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar'],
          });
          console.log('User signed up successfully:', );
          this.route.navigate(['/verify',{ userEmailId: userData.userEmailId }]);
        },
        (error) => {
          
          console.error('Error during signup:', error);
          this.snackBar.open("Email Already existing, please Sign Up with a new email", 'Close', {
            duration: 2000, // Adjust the duration as needed
            horizontalPosition: 'center', // You can change the position (e.g., 'start', 'end')
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          });
        }
      );
    }
  }
  startBounceAnimation() {
    this.bounceState = 'bounce';

  }
  resetBounceAnimation() {
    this.bounceState = 'normal';

  }
  canExist():
      | boolean
      | UrlTree
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree> {
      if (this.signupForm.dirty) {
        return confirm('You have unsaved changes. Do you really want to leave?')
          ? true
          : false;
      }
      return true;
    }


}
export function generateUserId(prefix: string = 'user'): string {
  const randomString = Math.random().toString(36).substring(7);
  return `${prefix}-${randomString}`;
}



