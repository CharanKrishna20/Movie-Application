import { CanActivateFn } from '@angular/router';

// auth/wishlist.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { JwtDecoderService } from '../services/jwt-decoder.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,private JwtDecoder:JwtDecoderService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken !== null){
      const userRole = this.JwtDecoder.getUserRole(jwtToken);

      if (userRole === 'ROLE_ADMIN') {
        return true;
      } else {
        alert('Access denied: You are not allowed to access this page');
        this.router.navigate(['/']);
        return false;
      }
    } else {
      alert('Please login to access this page');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
