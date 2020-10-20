import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, filter } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/Storage';
import { Router } from '@angular/router';


const TOKEN_KEY = 'user-access';


@Injectable({
  providedIn: 'root'
  
})
export class AuthenticationService {
  public user: Observable<any>;

    USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

  public username: String;
  public password: String;
 public  userInfo: any;
  parsedUserInfo: any;
  authenticatedUser: any;
  currentUserSubject: BehaviorSubject<any>;
  role: any;
  businesstype: any;
  currentuser: Object;
  public auth_token: any;
  


  constructor(private http: HttpClient,private storage: Storage, private router: Router ) {
   this.loadUser();
    this.currentUserSubject = new BehaviorSubject(null);
    this.user = this.currentUserSubject.asObservable().pipe(
      filter(response => response)
     
    );
   
  }

  public get currentUserValue() {
       return this.currentUserSubject.value;
}


  signIn(username: String, password: String): Observable<any> {
   
    const headers = new HttpHeaders({ Authorization: 'No Auth ' , appId:'SKYPLINE'})
    .append('Content-Type', 'application/json')
    .append('appId','SKYPLINE')
      .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', 'POST')
      .append('Access-Control-Allow-Origin', '*');
      
    let user={
      "username":"akash",
      "password":"akash"
    }
    return this.http.post('https://api.mycritic.org:4443/identity/api/login',user,{headers:headers})
    
    .pipe(map(user => {
      this.userInfo = user ;
    
      var str1 = new String( "Bearer " ); 
      var str2 = new String(this.userInfo.jwtToken );
      this.auth_token = str1.concat(str2.toString());
      this.currentUserSubject.next(user);
                
           this.storage.set(TOKEN_KEY,JSON.stringify(this.userInfo));
            localStorage.setItem(TOKEN_KEY,JSON.stringify(this.userInfo));   

           
          return(user);
          
    }));
   

  }

 


  loadUser() {

    this.storage.get(TOKEN_KEY).then(data => {
   
     
      if (data) {
       return this.currentUserSubject.next(data);
      }
      else {
        
       this.router.navigateByUrl('/login')
      }
    });

  }

  updatePassword(pass) {
    this.username = this.username;
    this.password = this.password;
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });

    return  this.http.post('https://api.mycritic.org:7443/admin/updatePassword', pass, {headers} );

  }
  registrationform(Body) {

    return this.http.post('https://api.mycritic.org:7443/admin/register', Body).subscribe(data => {
      
    });

  }



  forgotPassword(email) {

    return this.http.post('https://api.mycritic.org:7443/admin/forgetPassword', email);
  }






  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ':' + password);
  }



  async logout() {
this.storage.set(TOKEN_KEY, null);
this.currentUserSubject.next(null);
this.router.navigateByUrl('/login')

  }




}
