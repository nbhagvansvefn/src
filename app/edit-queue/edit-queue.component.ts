import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AppointmentService } from '../services/appointment.service';
import { QueueServiceService } from '../services/queue-service.service';

@Component({
  selector: 'app-edit-queue',
  templateUrl: './edit-queue.component.html',
  styleUrls: ['./edit-queue.component.scss'],
})
export class EditQueueComponent implements OnInit {
  showSpinner: boolean ;

  constructor(public appointmentService: AppointmentService,
              private queueService: QueueServiceService,
              private router: Router,public toastController: ToastController) { }

  ngOnInit() {}
  onsubmit(){
    this.showSpinner = true;
   

    let queueDetails = {
      queueId : this.appointmentService.queueItem.appointments[0].queue.queueId,
      queueName:this.appointmentService.queueItem.appointments[0].queue.queueName,
      averageAppointmentInMins:this.appointmentService.queueItem.appointments[0].queue.averageAppointmentInMins,
      maxAppointments:this.appointmentService.queueItem.appointments[0].queue.maxAppointments

    }

    this.queueService.updateQueue(queueDetails).subscribe(async data=>{
     

      this.showSpinner = false;
      const toast = await this.toastController.create({
        message: 'Your Queue Has Been Updated',
        duration: 2000
      });
      toast.present();
      this.router.navigate(['tabs/tab2']);
    });



  }

}
