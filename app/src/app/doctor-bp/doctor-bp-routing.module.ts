import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorBpPage } from './doctor-bp.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorBpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorBpPageRoutingModule {}
