import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BloodsugarPageRoutingModule } from './bloodsugar-routing.module';

import { BloodsugarPage } from './bloodsugar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BloodsugarPageRoutingModule
  ],
  declarations: [BloodsugarPage]
})
export class BloodsugarPageModule {}
