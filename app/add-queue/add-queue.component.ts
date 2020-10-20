import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QueueServiceService } from '../services/queue-service.service';
import { formatDate } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-queue',
  templateUrl: './add-queue.component.html',
  styleUrls: ['./add-queue.component.scss'],
})
export class AddQueueComponent implements OnInit  {

  slideOneForm: FormGroup;
  // var testData;
  today= new Date();
  jstoday = '';
  queueName : "" ;
 
  averageAppointmentInMins : "" ;
  maxAppointments : "";
  public adminID : any;
  public orgId :any ;
  showSpinner: boolean ;




  constructor(public formBuilder: FormBuilder,private queueService:QueueServiceService,
               public authenticationService:AuthenticationService,
               private router: Router, public toastController: ToastController) {

    

    }
    
    ngOnInit() {
      
    }


    onAddQueue(){
      this.showSpinner = true;
      this.adminID = this.authenticationService.userInfo.adminId ;
      this.orgId = this.authenticationService.userInfo.orgId ;
     
     
    

      const postBody = {
        orgId : this.orgId,
        adminId : this.adminID,
        queueName : this.queueName,
        averageAppointmentInMins : this.averageAppointmentInMins,
        maxAppointments : this.maxAppointments

         }


       this.queueService.addQueue(postBody).subscribe(async data=>{
    
        this.showSpinner = false;
        const toast = await this.toastController.create({
          message: 'New Queue Has Been Created',
          duration: 2000
        });
        toast.present();
        this.router.navigate(['tabs/tab2']);
      });;
      
     }

   

}
