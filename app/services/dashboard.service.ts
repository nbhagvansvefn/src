import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { Storage } from '@ionic/Storage';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public auth_token: any ;
  public headers :any
  userInfo: any;
 

  constructor(private http: HttpClient,public authenticationService:AuthenticationService,
    private storage:Storage) { 
      let userdata= JSON.parse(localStorage.getItem('user-access'));
      var str1 = new String( "Bearer " ); 
      var str2 = userdata.jwtToken;
      this.auth_token = str1.concat(str2.toString());
          }
   
  getStatusCounts(body){
  

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth_token
    })
    
    return this.http.post('https://api.mycritic.org:4443/skypline/dashboard/statusCounts',body,{ headers: headers })

  } 

  getStatusTotalCounts(body){
    //this.auth_token = this.authenticationService.auth_token
 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth_token
    })
    return this.http.post('https://api.mycritic.org:4443/skypline/dashboard/statusOverallCounts',body,{ headers: headers })

  }


   }

