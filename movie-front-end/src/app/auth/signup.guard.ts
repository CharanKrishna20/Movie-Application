import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SignupComponent } from '../signup/signup.component';
@Injectable({
  providedIn: 'root'
})
export class signupGuard implements CanDeactivate<SignupComponent>{
  canDeactivate(component: SignupComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return component.canExist();
  }
}


