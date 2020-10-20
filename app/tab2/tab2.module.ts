import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { CalendarModule } from 'ion2-calendar';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { HttpClientModule } from '@angular/common/http';
import { AddQueueComponent } from '../add-queue/add-queue.component';
import { QueueDetailsComponent } from '../queue-details/queue-details.component';
import { EditAppointmentComponent } from '../edit-appointment/edit-appointment.component';
import { EditQueueComponent } from '../edit-queue/edit-queue.component';
import { AddAppointmentComponent } from '../add-appointment/add-appointment.component';
import { DatePipe } from '@angular/common';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CalendarModule,
    ReactiveFormsModule,
    HttpClientModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab2Page },
                           { path:"addqueue", component:AddQueueComponent},
                           {path:"queuedetails", component:QueueDetailsComponent},
                           {path:"editappointment", component:EditAppointmentComponent},
                           {path:"editqueue", component:EditQueueComponent},
                           {path:"addappointment", component:AddAppointmentComponent}

  ])
  ],
  providers: [
    DatePipe
  ],
  declarations: [Tab2Page,
                 AddQueueComponent,
                 QueueDetailsComponent,
                 EditAppointmentComponent,
                 EditQueueComponent,
                 AddAppointmentComponent]
})
export class Tab2PageModule {}
