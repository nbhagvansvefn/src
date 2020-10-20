import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CalendarModule } from 'ion2-calendar';
import { Tab3Page } from './tab3.page';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';






@NgModule({

  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    ExploreContainerComponentModule,
    Ng2GoogleChartsModule,

    RouterModule.forChild([{ path: '', component: Tab3Page }])
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
