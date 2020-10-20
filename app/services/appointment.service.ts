import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  public auth_token: any ;
  public headers :any

  queueItem:any ;

  url_updateAppointment = 'https://api.mycritic.org:4443/skypline/appointment/updateAppointment';

  url_updateAppointmentStatus ='https://api.mycritic.org:4443/skypline/appointment/updateAppointmentStatus';

  url_addAppointment ='https://api.mycritic.org:4443/skypline/appointment/addAppointment';

  url_getAppointments ='https://api.mycritic.org:4443/skypline/appointment/getAppointmentDataByDate';

  url_getAllApppointments ='https://api.mycritic.org:4443/skypline/appointment/getAllAppointmentData';


  constructor(private http: HttpClient,public authenticationService:AuthenticationService) {
    let userdata= JSON.parse(localStorage.getItem('user-access'));
      var str1 = new String( "Bearer " ); 
      var str2 = userdata.jwtToken;
      this.auth_token = str1.concat(str2.toString());
   }

  getAllAppoinments(allAppointmens){
   
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth_token
    })

    return this.http.post(`${this.url_getAllApppointments}`,allAppointmens,{ headers: headers });
  }

  getAppoinments(appointmens){
   
      const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth_token
    })
  
    return this.http.post(`${this.url_getAppointments}`,appointmens,{ headers: headers });
  }

  updateAppointment(appointment){
  
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth_token
    })
    return this.http.post(`${this.url_updateAppointment}`,appointment,{ headers: headers });

  }

  updateAppointmentStatus(appointmentStatus){
   //

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth_token
    })
    return this.http.post(`${this.url_updateAppointmentStatus}`,appointmentStatus,{ headers: headers });

  }

  addnewAppointment(customerData){
    

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth_token
    })
    return this.http.post(`${this.url_addAppointment}`,customerData,{ headers: headers });
  }

  getCustomers(body){
   
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth_token
    })
    return this.http.post('https://api.mycritic.org:4443/skypline/customer/getCustomersByAdminId',body,{ headers: headers });
  }


}
