import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  public auth_token: any ;
  public headers :any
  url = 'https://api.mycritic.org:4443/skypline/admin/addAdmin';
  url_getAdminDetails = 'https://api.mycritic.org:4443/skypline/admin'
  //url_updatedynamicTemplate = 'https://localhost:6443/admin/updateDynamicTemplate';
  // url = 'localhost:8080/addstudent';

  constructor(private http: HttpClient,public authenticationService:AuthenticationService) { }
  ngOnInit(){
    let userdata= JSON.parse(localStorage.getItem('user-access'));
    var str1 = new String( "Bearer " ); 
    var str2 = userdata.jwtToken;
    this.auth_token = str1.concat(str2.toString());
  }
  addAdmin(adminData){
   // this.auth_token = this.authenticationService.auth_token
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       appId:'SKYPLINE',
      'Authorization': this.auth_token
    })

    return this.http.post('https://api.mycritic.org:4443/skypline/admin/register',adminData,{ headers: headers });
  }

  updatedynamicTemplate(body){
  //  this.auth_token = this.authenticationService.auth_token
 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth_token
    })
    return this.http.post('https://api.mycritic.org:4443/skypline/admin/updateDynamicTemplate',body,{ headers: headers })
  }

  updatePassword(body){
   // this.auth_token = this.authenticationService.auth_token
 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       appId:'SKYPLINE',
      'Authorization': this.auth_token
    })
    return this.http.post('https://api.mycritic.org:4443/identity/api/updatePassword',body,{ headers: headers }).subscribe(data=>{
      console.log(data, "data");

    });

  }

 getAdminDetails(id){
  //this.auth_token = this.authenticationService.auth_token

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
   'Authorization': this.auth_token
  })
  return this.http.get(`${this.url_getAdminDetails}/${id}`,{ headers: headers });
 }
 
 customerEndScreen(body){
  this.auth_token = this.authenticationService.auth_token

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
   'Authorization': this.auth_token
  })
  return this.http.post('https://api.mycritic.org:4443/skypline/admin/updateStatusScreen1',body,{ headers: headers })


 }

 enableReminders(body){
  this.auth_token = this.authenticationService.auth_token
  
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
   'Authorization': this.auth_token
  })
  return this.http.post('https://api.mycritic.org:4443/skypline/admin/enableReminders',body,{ headers: headers });


 }





}
