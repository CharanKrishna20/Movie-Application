import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  resetPasswordForm!: FormGroup;
  userEmailId!:string;
  password!: string;
  confirmPassword!: string;

  constructor(private fb: FormBuilder,private userService:UserService,private route:ActivatedRoute,private router:Router,
    private snackBar:MatSnackBar) { 
    this.resetPasswordForm = this.fb.group({
      userEmailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }
  
  ngOnInit(): void {
    // this.initializeForm();
    this.route.params.subscribe((params) => {
      this.resetPasswordForm.patchValue({ userEmailId: params['userEmailId'] });
    });
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
  submitResetPassword(): void {
    if (this.resetPasswordForm.valid) {
      const userEmailId = this.resetPasswordForm.get('userEmailId')?.value;
      const password = this.resetPasswordForm.get('password')?.value;
      // Update the user's password by sending a request to the backend
      const resetData = {
        userEmailId: userEmailId,
        password: password,

      };

      this.userService.resetPasswordUpdate(resetData).subscribe(
        (response) => {
          console.log(response);
          // alert('Password reset successfully');
          this.snackBar.open("Password reset successfully!", 'Close', {
            duration: 2000, // Adjust the duration as needed
            horizontalPosition: 'center', // You can change the position (e.g., 'start', 'end')
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar'],
          });
          console.log('Password:', password);
          console.log(resetData);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error during password reset:', error);
        }
      );
    } else {
      console.log('Form is invalid or passwords do not match');
    }
  }
  // passwordsNotMatch(): boolean {
  //   const password = this.resetPasswordForm.get('password')?.value;
  //   const confirmPassword = this.resetPasswordForm.get('confirmPassword')?.value;
  //   return password !== confirmPassword;
  // }
}
