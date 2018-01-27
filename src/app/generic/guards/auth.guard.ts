import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MessageConfig } from '../message.config';
import { CookieService} from 'ngx-cookie';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private router: Router, private err: MessageConfig, private cookieService: CookieService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       return this.checkLogin();
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       return this.checkLogin();
    }

    checkLogin(){
        if (this.cookieService.get('token')) {
            return true;
        }
        this.router.navigate(['/error']);
        localStorage.setItem("errorMessage",this.err.getErrorMessage("noJwt"));
        return false;
    }
}