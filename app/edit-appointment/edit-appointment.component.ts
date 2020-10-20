import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.scss'],
})
export class EditAppointmentComponent implements OnInit {
  selectedDate: any;
  showSpinner: boolean ;

  pipe = new DatePipe('en-US');


  constructor(public appointmentService: AppointmentService,
              private datePipe: DatePipe,
              private router: Router, public toastController: ToastController,) {

             }



  ngOnInit() {}

  onsubmit(){
    this.showSpinner = true;
   

    const appointmenttime =this.pipe.transform(this.appointmentService.queueItem.appointmentTime, 'yyyy-MM-dd HH:mm:ss');

  
    this.onChangeDate(this.appointmentService.queueItem.appointmentTime);
    let postData = {
      appointmentId : this.appointmentService.queueItem.appointmentId,
      name : this.appointmentService.queueItem.customer.name,
      phoneNumber: this.appointmentService.queueItem.customer.phoneNumber,
      appointmentTime: appointmenttime,
      status: this.appointmentService.queueItem.status
    }

  
    this.appointmentService.updateAppointment(postData).subscribe(async data=>{
    
      this.showSpinner = false;
      this.showSpinner = false;
      const toast = await this.toastController.create({
        message: 'Appointment has been updated',
        duration: 2000
      });
      toast.present();
      this.router.navigate(['tabs/tab2']);
    });
  
  }

  onChangeDate(value)
  {
 
    this.selectedDate = value;
  
  }


}