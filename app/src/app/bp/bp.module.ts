import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BpPageRoutingModule } from './bp-routing.module';

import { BpPage } from './bp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BpPageRoutingModule
  ],
  declarations: [BpPage]
})
export class BpPageModule {}
