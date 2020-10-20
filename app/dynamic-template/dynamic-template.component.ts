import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dynamic-template',
  templateUrl: './dynamic-template.component.html',
  styleUrls: ['./dynamic-template.component.scss'],
})
export class DynamicTemplateComponent implements OnInit {

  intialMes = "";
  finalMes = "";
  public userName :any;
  showSpinner: boolean ;

  constructor(private registrationService: RegistrationService,private http: HttpClient,
              public authenticationService:AuthenticationService,
              private router: Router,   public toastController: ToastController) { }

  ngOnInit() {}
   
  updateTemplate(){
    this.showSpinner = true;
    this.userName = this.authenticationService.userInfo.username

    const postData = {
      userId :this.userName,
      intialText : this.intialMes,
      finalText : this.finalMes
     }
    
     this.registrationService.updatedynamicTemplate(postData).subscribe(async data=>{
       
         this.showSpinner = false;
         const toast = await this.toastController.create({
           message: 'Your Template Has Been Updated',
           duration: 2000
         });
         toast.present();
         this.router.navigate(['tabs/tab4']);
       });
  }


}


