import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorsSignupPage } from './doctors-signup.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorsSignupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorsSignupPageRoutingModule {}
