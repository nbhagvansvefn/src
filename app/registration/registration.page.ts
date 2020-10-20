import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  registrationForm:FormGroup;
  orgName : "";
  userId : "";
  password : "";
  firstName : "";
  email : "";
  phoneNumber : "";
  roleId: "";

  showSpinner: boolean ;





  constructor(public formBuilder: FormBuilder,private registrationService:RegistrationService,
              private router: Router,  public toastController: ToastController) {

   }

  ngOnInit() {
  }

  onClickRegistration(){
    this.showSpinner = true;

     const postBody = {
      userId : this.userId,
      password : this.password,
      firstname : this.firstName,
      org :{
        orgName : this.orgName
      },
      email : this.email,
      phone : this.phoneNumber,
      role :{
        roleId : this.roleId
      }
     }
  
     this.registrationService.addAdmin(postBody).subscribe(async data=>{
   

      this.showSpinner = false;
      const toast = await this.toastController.create({
        message: 'New Account Has Been Created',
        duration: 2000
      });
      toast.present();
      this.router.navigate(['tabs/tab4']);
    });;
  }
   



}


