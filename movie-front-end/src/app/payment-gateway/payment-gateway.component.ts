import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var Razorpay: any;

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrl: './payment-gateway.component.css'
})
export class PaymentGatewayComponent {
  form: any = {}; 
  constructor(private http: HttpClient, private orderService:PaymentService,private route:Router,
    private authService:AuthService,private snackBar:MatSnackBar) {

  }
  userEmailId:string='';

  ngOnInit():void {
    this.orderService.getPayUserDetails().subscribe(
      (response)=>{
        console.log("component response",response);
        this.form.name=response.userName;
        this.form.email=response.userEmailId;
        this.form.amount=response.amount;
        this.userEmailId=response.userEmailId;
      },
      (error)=>{
        console.log("error occured...")
      }
    )
    

  }

  sayHello() {
    alert("Hello DK");
  }

  paymentId!: string;
  error!: string;
  
  options = {
    "key": "",
    "amount": "", 
    "name": "Movie World",
    "description": "Web Development",
    "image": "https://imgur.com/a/oC74SkZ",
    "order_id":"",
    "handler": function (response: any){
      var event = new CustomEvent("payment.success", 
        {
          detail: response,
          bubbles: true,
          cancelable: true
        }
      );	  
      window.dispatchEvent(event);
    }
    ,
    "prefill": {
    "name": "",
    "email": "",
    "contact": ""
    },
    "notes": {
    "address": ""
    },
    "theme": {
    "color": "#3399cc"
    }
    };
  
    onSubmit(): void {
      this.paymentId = ''; 
      this.error = ''; 
      let rzp1: any; // Declare rzp1 here
      let rzp2: any; // Declare rzp2 here
      this.orderService.createOrder(this.form).subscribe(
      data => {
        this.options.key = data.secretId;
        this.options.order_id = data.razorpayOrderId;
        this.options.amount = data.applicationFee; //paise
        this.options.prefill.name = "";
        this.options.prefill.email = "";
        this.options.prefill.contact = "";
        
        if(data.pgName ==='razor2') {
          this.options.image="";
           rzp1 = new Razorpay(this.options);
          rzp1.open();
        } else {
           rzp2 = new Razorpay(this.options);
          rzp2.open();
        }
       
                
        rzp1.on('payment.failed',  (response: { error: { code: any; description: any; source: any; step: any; reason: string; metadata: { order_id: any; payment_id: any; }; }; }) =>{    
          // Todo - store this information in the server
          console.log(response);
          console.log(response.error.code);    
          console.log(response.error.description);    
          console.log(response.error.source);    
          console.log(response.error.step);    
          console.log(response.error.reason);    
          console.log(response.error.metadata.order_id);    
          console.log(response.error.metadata.payment_id);
          this.error = response.error.reason;
        }
        );
      }
      ,
      err => {
        this.error = err.error.message;
      }
      );
    }

    @HostListener('window:payment.success', ['$event']) 
    onPaymentSuccess(event: { detail: any; }): void {
       console.log(event.detail);
       //Assuming event.detail contains payment details
   const paymentDetails = event.detail;
   this.snackBar.open("Hurrayyy!! Subcribed succesfully, you are now a Pro user", 'Close', {
    duration: 2000, // Adjust the duration as needed
    horizontalPosition: 'center', // You can change the position (e.g., 'start', 'end')
    verticalPosition: 'bottom',
    panelClass: ['success-snackbar'],
  });
   //this.route.navigate(['/']);
   this.route.navigate(['/login'])
   const userEmailId=this.userEmailId;
   
      // Get the userEmailId from your component form or wherever it is stored
  // const userEmailId = this.form.email; // Replace with the actual source of userEmailId
  console.log("Payment user details from payment component:", paymentDetails);
  console.log("User email details from payment component:", this.userEmailId);
   // Update user's subscription status
   this.orderService.updateSubscriptionStatus( this.userEmailId,paymentDetails)
     .subscribe(
       (response) => {
         console.log('Subscription status updated successfully', response);
         // Perform additional actions or navigate to another page if needed
         this.authService.updateSubscriptionStatus(true);
         this.route.navigate(['/home']);
       },
       (error) => {
         console.error('Error updating subscription status', error);
         // Handle error as needed
       }
     );
     this.orderService.updateTvSubscriptionStatus( this.userEmailId,paymentDetails)
     .subscribe(
       (response) => {
         console.log('Subscription status updated successfully', response);
         //Perform additional actions or navigate to another page if needed
         this.route.navigate(['/home']);
       },
       (error) => {
         console.error('Error updating subscription status', error);
         // Handle error as needed
       }
     );   
    }
}
