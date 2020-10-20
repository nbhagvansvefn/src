import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: any;
  currPass :string ;
  newPass :string ;
  repeatPass:string;
  showSpinner:boolean;
  public userInfo: any;
  public userName :any;
  

  constructor(public formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private alertCtrl: AlertController,
    public authenticationService:AuthenticationService
    ) {

 }

  ngOnInit() {}


   updateNewPassword(){
    this.userName = this.authenticationService.userInfo.username


    let postBody  ={
      userId : this.userName,
      newPassword : this.newPass,
      oldPassword : this.currPass,
    }

    this.registrationService.updatePassword(postBody);
    


    //  this.showSpinner = true;

    // if(this.repeatPass === this.newPass){
    //   (this.registrationService.updatePassword(postBody).subscribe(
    //   async data => {
    //       this.showSpinner = false;
        
    //     let alert =  await this.alertCtrl.create({
    //       header: 'Password Successfully Updated',
    //       message: 'You Can Login With New Credentials',
    //       buttons: ['OK']
    //     });
    //    await alert.present();

    //   },
    //   async error => {
    //      this.showSpinner = false;
    
    //     let alert =  await this.alertCtrl.create({
    //     header: 'Wrong Passsword',
    //     message: 'Please Enter Correct Current Password',
    //     buttons: ['OK']
    //   });
    //  await alert.present();

    //   }
    // )
    // );


    // } else{
    //   this.showSpinner = false;
    //   let alert =  await this.alertCtrl.create({
    //     header: 'Not Matching',
    //     message: 'The New Password and Repeat Password Are Not Matching',
    //     buttons: ['OK']
    //   });
    //  await alert.present();

    // }



  }


}
