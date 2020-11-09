import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorstabsPageRoutingModule } from './doctorstabs-routing.module';

import { DoctorstabsPage } from './doctorstabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorstabsPageRoutingModule
  ],
  declarations: [DoctorstabsPage]
})
export class DoctorstabsPageModule {}
