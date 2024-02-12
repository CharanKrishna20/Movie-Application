import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtDecoderService {

  constructor() { }

  public  decodeToken(jwtToken: string){
    console.log("decoding token is " + jwtToken);
    const base64Url= jwtToken.split('.')[1];
    const base64= base64Url.replace(/-/g,'+').replace(/_/g,'/');
    const jsonPayload=decodeURIComponent(
      atob(base64)
     
      )
      
     return JSON.parse(jsonPayload);
  }

  getUserRole(jwtToken: string): string | null {
    const decodedToken = this.decodeToken(jwtToken);
  
    if (decodedToken) {
      console.log("Decoded token:", decodedToken);
  
      const userRole = decodedToken.currentRole;
      
      if (userRole) {
        console.log("User role:", userRole);
        return userRole;
      } else {
        console.error("Missing currentRole property in the decoded token");
        return null;
      }
    } else {
      console.error("Invalid token structure");
      return null;
    }
  }

  getUserEmail(jwtToken: string): string | null {
    const decodedToken = this.decodeToken(jwtToken);

    if (decodedToken) {
      console.log("Decoded token:", decodedToken);

      const userEmail = decodedToken.emailId;

      if (userEmail) {
        console.log("User email:", userEmail);
        return userEmail;
      } else {
        console.error("Missing emailId property in the decoded token");
        return null;
      }
    } else {
      console.error("Invalid token structure");
      return null;
    }
  }
  
  
}
