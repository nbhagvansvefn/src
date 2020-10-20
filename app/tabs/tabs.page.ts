import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { RegistrationService } from '../services/registration.service';
import { Storage } from '@ionic/Storage';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{
  public adminID: any;
  public adminInfo: any;
  homeScreenStatus: any;
  token: any;
 

  constructor(public router:Router,public registrationService: RegistrationService,
              public authenticationService:AuthenticationService,
              private storage: Storage) {}
  ngOnInit(){
    let userdata= JSON.parse(localStorage.getItem('user-access'));
           this.getAdminDetails();
      this.adminID = userdata.adminId;

    
   
  }
//   getStorage(){
//     return  this.storage.get('user-access').then((data)=>{
//       console.log(data,"storagedata");
//       return data;
//   });
// }

  getAdminDetails(){
    this.storage.get('user-access').then(data=>{
      this.adminID = data.adminId;
    this.registrationService.getAdminDetails(this.adminID).subscribe(data => {
      this.adminInfo = data;
      this.homeScreenStatus = this.adminInfo.results[0].statusScreen ;
      

    })});
  }



}
