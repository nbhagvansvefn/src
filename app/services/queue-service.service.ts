import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class QueueServiceService {
  public auth_token: any ;
  public headers :any

  url = 'https://api.mycritic.org:4443/skypline/queue/addQueue';
  url_updateQueue ='https://api.mycritic.org:4443/skypline/queue/update';


  constructor(private http: HttpClient,public authenticationService:AuthenticationService) { }

  GetQueues(){
    this.auth_token = this.authenticationService.auth_token
   
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth_token
    })
    return this.http.get("https://api.mycritic.org:4443/skypline/appointment/getAllAppointmentsGroupByQueueId/1",{ headers: headers });
  }




  addQueue(queueData){
    this.auth_token = this.authenticationService.auth_token
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth_token
    })
    return this.http.post(`${this.url}`,queueData,{ headers: headers })
  }


  updateQueue(queueData){
    this.auth_token = this.authenticationService.auth_token
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth_token
    })
    return this.http.post(`${this.url_updateQueue}`,queueData,{ headers: headers });
  }


}
