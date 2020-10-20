import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab4PageRoutingModule } from './tab4-routing.module';

import { Tab4Page } from './tab4.page';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { DynamicTemplateComponent } from '../dynamic-template/dynamic-template.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    Tab4PageRoutingModule
  ],
  declarations: [Tab4Page,
    ChangePasswordComponent,
    DynamicTemplateComponent]
})
export class Tab4PageModule {}
