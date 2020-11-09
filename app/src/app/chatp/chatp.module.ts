import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatpPageRoutingModule } from './chatp-routing.module';

import { ChatpPage } from './chatp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatpPageRoutingModule
  ],
  declarations: [ChatpPage]
})
export class ChatpPageModule {}
