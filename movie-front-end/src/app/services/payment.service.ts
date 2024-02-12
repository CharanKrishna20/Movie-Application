import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
	private payUrl="http://localhost:4444/payUser";
	private subscriptionUrl = "http://localhost:4444/pg";
  constructor(private http: HttpClient) {

	}
  
  createOrder(order: { name: string; email: string; phone: string; amount: number; }): Observable<any> {
		return this.http.post("http://localhost:4444/pg/createOrder", {
		customerName: order.name,
		email: order.email,
		phoneNumber: order.phone,
		amount: order.amount
		}, httpOptions);
	}
		getPayUserDetails(): Observable<any> {
		console.log('method invoked of getpayuserdetails', localStorage.getItem('jwtToken'));
	
		const httpOptions = {
		  headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
		  })
		};
	
		return this.http.get<any>(this.payUrl+"/v1/userDetails", httpOptions)
		  .pipe(
			map((response: any) => {
			  console.log('User Details:', response);
			  return response;
			}),
			catchError((error: HttpErrorResponse) => {
			  console.error('Error fetching user details:', error);
			  return throwError(error);
			})
		  );
	  }
	  updateSubscriptionStatus(userEmailId:string,paymentDetails:any): Observable<any> {
		const updateSubscriptionUrl = `${this.subscriptionUrl}/updateSubscription`;
		console.log('paymentDetails:', paymentDetails);
		// Assuming you have a backend endpoint to update subscription status
		// Send the payment details and any other necessary data
		const requestBody = {
		  userEmailId:userEmailId,
		  paymentId: paymentDetails.razorpay_payment_id,
		  orderId: paymentDetails.razorpay_order_id,
		  signature: paymentDetails.razorpay_signature,
		  // Add any additional data needed for updating subscription status
		};
	   console.log(requestBody);
		return this.http.post(updateSubscriptionUrl, requestBody, httpOptions);
	  }
	  updateTvSubscriptionStatus(userEmailId:string,paymentDetails:any): Observable<any> {
		const updateSubscriptionUrl = `${this.subscriptionUrl}/updateTvSubscription`;
		console.log('paymentDetails:', paymentDetails);
		// Assuming you have a backend endpoint to update subscription status
		// Send the payment details and any other necessary data
		const requestBody = {
		  userEmailId:userEmailId,
		  paymentId: paymentDetails.razorpay_payment_id,
		  orderId: paymentDetails.razorpay_order_id,
		  signature: paymentDetails.razorpay_signature,
		  // Add any additional data needed for updating subscription status
		};
	   console.log(requestBody);
		return this.http.post(updateSubscriptionUrl, requestBody, httpOptions);
	  }
}
