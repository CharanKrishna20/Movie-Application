import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.userUrl2 + "/allUsers").pipe(
      map((response: any[]) => {
        console.log("Response coming from user service", response);
        return response; // Return the response data
      }),
      catchError((error) => {
        console.log("Error while getting the data", error);
        throw error;
      })
    );
  }


  constructor(private http:HttpClient,private router:Router) { }
  userUrl="http://localhost:4444/auth-app";
  userUrl2="http://localhost:4444/user"
    loginUser(loginData:any){
      console.log("reached service");
      console.log(loginData);
      return this.http.post(this.userUrl+"/loginCheck",loginData);
    }
   signupUser(signupdata:any):Observable<any>{
    return this.http.post(this.userUrl2+"/addUser1",signupdata)
    .pipe(
      catchError((error)=>{
        console.log("error while signup",error)
        throw error
      })
    )

   } 
  verifyUser(verifyData: any): Observable<any> {
    return this.http.post(this.userUrl2 + '/verifyUser', verifyData).pipe(
      map((response: any) => {
        console.log('Response from server:', response);
        if (response && response.statusCode === 'OK') {
          return response.body; // Successful response
        } else {
          throw new Error(response.body || 'Invalid verification code or user not found.');
        }
      }),
      catchError((error) => {
        console.log('Error while verifying', error);
        return throwError(error); // Rethrow the error
      })
    );
  }

  getUserById(userEmail: string): Observable<User> {
    console.log('method invoked', localStorage.getItem('jwtToken'));
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + localStorage.getItem('jwtToken')
      })
    };
  
    return this.http.get<User>(`${this.userUrl2}/v1/userDetails`, httpOptions);
  }
  
  getUserSubscriptionStatus(): Observable<boolean> {
    const url = `${this.userUrl2}/v1/subscriptionStatus`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + localStorage.getItem('jwtToken')
      })
    };
  
    return this.http.get<boolean>(url, httpOptions)
      .pipe(
        tap((status) => console.log('Subscription Status:', status)),
        catchError((error) => {
          console.log('Error while fetching subscription status', error);
          return throwError(error);
        })
      );
  }
    forgotPassword(userEmailId: string): Observable<any> {
    const url = `${this.userUrl2}/forgot-password`;
    return this.http.post(url, { userEmailId });
  }
  resetCodeVerify(verifyData: any): Observable<any> {
    return this.http.post(this.userUrl2 + '/verifyResetPasswordCode', verifyData, { responseType: 'text' }).pipe(
        map((response: any) => {
            console.log('Response from server:', response);

            if (response === 'Reset password code verified successfully') {
                return { message: response }; // Wrap the response in an object
            } else {
                throw new Error(response || 'Invalid reset password code or user not found.');
            }
        }),
        catchError((error) => {
            console.log('Error while verifying', error);
            return throwError(error); // Rethrow the error
        })
    );
}
  resetPasswordUpdate(data: any): Observable<any> {
    return this.http.post(this.userUrl2 + '/resetPassword', data, { responseType: 'text' }).pipe(
      tap((response: any) => {
        console.log('Complete Response from server:', response);
        console.log('data',data);
      }),
      map((response: any) => {
        console.log('Response from server:', response);
        if (response && response.includes('Password reset successfully')) {
          // Handle success without throwing an error
          return response;
        } else {
          throw new Error(response || 'Password updation failed.');
        }
      }),
      catchError((error) => {
        console.log('Error while updating passwords', error);
        return throwError(error); // Rethrow the error
      })
    );
  }
  
  
}
