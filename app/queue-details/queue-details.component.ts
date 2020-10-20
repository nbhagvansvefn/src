import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-queue-details',
  templateUrl: './queue-details.component.html',
  styleUrls: ['./queue-details.component.scss'],
})
export class QueueDetailsComponent implements OnInit {

  constructor(public appointmentService: AppointmentService,
               private router: Router) { }

  ngOnInit() {
    
  }
  appointmentSelected(child){
    this.appointmentService.queueItem = child;
  
    this.router.navigate(['tabs/tab2/editappointment']);

  }

}
