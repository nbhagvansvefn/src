import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, RouteConfigLoadEnd } from '@angular/router';
import { InjectionToken } from '@angular/core'
import { AuthenticationService } from '../services/authentication.service';
import { take, map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { JsonPipe } from '@angular/common';
import { Storage } from '@ionic/Storage';
import { isObject } from 'util';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    parsedUser: {};
    businesstype: any;
    userinfo: any;
    navCtrl: any;
    constructor(
        private router: Router,private storage : Storage,
        private authenticationService: AuthenticationService,
        private alertctrl: AlertController
        
    ) { 
      this.authenticationService.user.subscribe(data=>{
          data
      }
        )
     }

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  
        return this.authenticationService.user.pipe(

            take(1),
            map(user => {
                        
                if (user) {
                 
                    return true;
                }
                else {
                    this.showAlert();
                    return this.router.parseUrl('/login')
                }
            })
        )
    }
    canActivateChild(route: ActivatedRouteSnapshot) {
       
        let exp = route.data.adminId;
     
        return this.authenticationService.user.pipe(

            take(1),
            map(user => {
               
            
                if (user) {
                            
                     if(exp==9){
                         return true;
                     }
 
                     else {
                        this.showAlert();
                         return this.router.parseUrl('/login')
                     }
                 }
                 else {
                     this.showAlert();
                     return this.router.parseUrl('/login')
                 } 
             }  
               
               
            )
        )
        }
       

    
    
    async showAlert() {

        let alert = await this.alertctrl.create({
            header: 'Denied',
            message: ' You are not authorized',
            buttons: ['Ok']

        });
        alert.present();
    }
    async usernotfound() {

        let alert = await this.alertctrl.create({
            header: 'User not found',
            message: ' User with current credentials not found',
            buttons: ['Ok']

        });
        alert.present();
    }

    //const currentUser = this.authenticationService.currentUserValue;
    //  if (currentUser) {
    //// check if route is restricted by role
    //if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
    // role not authorised so redirect to home page
    //    this.router.navigate(['/']);
    //   return false;
    //  }

    // authorised so return true
    // return true;


    // not logged in so redirect to login page with the return url
    //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    // return false;
    // }
}