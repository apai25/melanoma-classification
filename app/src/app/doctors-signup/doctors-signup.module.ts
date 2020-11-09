import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorsSignupPageRoutingModule } from './doctors-signup-routing.module';

import { DoctorsSignupPage } from './doctors-signup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorsSignupPageRoutingModule
  ],
  declarations: [DoctorsSignupPage]
})
export class DoctorsSignupPageModule {}
