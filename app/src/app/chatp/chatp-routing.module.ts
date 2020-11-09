import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatpPage } from './chatp.page';

const routes: Routes = [
  {
    path: '',
    component: ChatpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatpPageRoutingModule {}
