import { Component, OnInit } from '@angular/core';
import { RouterModule, Router} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string;
  password: string;
    
  parsedUserInfo: any;
  userInfo:any;
  showSpinner: boolean = false;

  constructor(private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }
  signIn(){
    this.showSpinner = true ;
         //this.router.navigate(['/tabs/tab1']);
         {
        //  this.router.navigate(['/tabs/tab4']);
        
              this.authenticationService.signIn(this.username, this.password)
          .pipe(first())
          .subscribe(obj=>{
           
            this.userInfo = obj;
           
                   
            this.showSpinner = false ;
              this.router.navigate(['/tabs/tab3']);
            
            /*(businesstype==1) {
              this.router.navigate(['/tabs/tab3']);
      
            }*/
            
           
          });
      
        }
  }
}
