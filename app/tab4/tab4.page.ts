import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
﻿import { from } from 'rxjs/observable/from';
import { groupBy, mergeMap, toArray,reduce } from 'rxjs/operators';
import { DashboardService } from '../services/dashboard.service';
import { of } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  public auth_token:any;
  public adminID: any;
  public userId: any ;
  public adminInfo: any;
  public roleId :any ;
  
  public enableReminders :boolean ;
  public customerEndScreen : boolean ;
  data_enabledReminder: any;
  data_CustomerEndScreen: Object;

  constructor(private router:Router,  public authenticationService:AuthenticationService,
              private http: HttpClient,public registrationService: RegistrationService) { }

  ngOnInit() {
    let userdata= JSON.parse(localStorage.getItem('user-access'));
    this.adminID = userdata.adminId;
   
    //this.getAdminDetails();
    this.registrationService.getAdminDetails(this.adminID).subscribe(data => {
      this.adminInfo = data;
    
      this.customerEndScreen = this.adminInfo.results[0].statusScreen ;
      this.enableReminders = this.adminInfo.results[0].enableReminders ;
      this.roleId = this.adminInfo.results[0].role.roleId;
      

    });

  }
  
  ChangePassword(){
    this.router.navigate(['tabs/tab4/changePassword']);

  }

  dynamicTemplate(){
    this.router.navigate(['tabs/tab4/dynamicTemplate']);
  }

  getAdminDetails(){
    this.registrationService.getAdminDetails(this.adminID).subscribe(data => {
      this.adminInfo = data;
      
      this.customerEndScreen = this.adminInfo.results[0].statusScreen ;
      this.enableReminders = this.adminInfo.results[0].enableReminders ;
      this.roleId = this.adminInfo.results[0].role.roleId;
      

    });
  }
  
  onCustomerEndScreen(){
    this.userId = this.authenticationService.userInfo.username

    const postBody = {
      userId : this.userId
    }

    this.registrationService.customerEndScreen(postBody).subscribe(data=>{

      this.data_CustomerEndScreen= data;

  });
  }

  onEnableReminders(){
    this.userId = this.authenticationService.userInfo.username
    const postBody = {
      userId : this.userId
    }
   
    this.registrationService.enableReminders(postBody).subscribe(data=>{
      console.log(data, "data");

      this.data_enabledReminder = data;

  })

  }

}
