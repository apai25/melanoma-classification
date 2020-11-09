import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorBpPageRoutingModule } from './doctor-bp-routing.module';

import { DoctorBpPage } from './doctor-bp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorBpPageRoutingModule
  ],
  declarations: [DoctorBpPage]
})
export class DoctorBpPageModule {}
