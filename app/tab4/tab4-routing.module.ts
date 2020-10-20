import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab4Page } from './tab4.page';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { DynamicTemplateComponent } from '../dynamic-template/dynamic-template.component';

const routes: Routes = [
  {
    path: '',
    component: Tab4Page
  },
  {
    path:'changePassword',
    component: ChangePasswordComponent
  },
  {
    path:'dynamicTemplate',
    component:DynamicTemplateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab4PageRoutingModule {}
