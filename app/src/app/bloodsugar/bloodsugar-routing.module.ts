import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BloodsugarPage } from './bloodsugar.page';

const routes: Routes = [
  {
    path: '',
    component: BloodsugarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BloodsugarPageRoutingModule {}
