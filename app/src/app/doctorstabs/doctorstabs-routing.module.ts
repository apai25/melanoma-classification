import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorstabsPage } from './doctorstabs.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorstabsPage,
    children: [
      {path: 'bp', loadChildren: '../bp/bp.module#BpPageModule'},
      {path: 'bloodsugar', loadChildren: '../bloodsugar/bloodsugar.module#BloodsugarPageModule'},
      {path: 'upload', loadChildren: '../upload/upload.module#UploadPageModule'},
      {path: 'chatp', loadChildren: '../chatp/chatp.module#ChatpPageModule'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorstabsPageRoutingModule {}
