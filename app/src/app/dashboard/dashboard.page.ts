import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router'


@Component({
  selector: 'app-account',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  pb: string
  pb1: string
  constructor(public af: AngularFireAuth, public fs: AngularFirestore, public actionSheet: ActionSheetController, public router: Router) { 
  }

  ngOnInit() {
    
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheet.create({
      header: 'Select Your Hospital',
      mode: 'ios',
      buttons: [
        {
          text: 'cancel',
          role: 'cancel',
          icon: 'trash',
          handler: () => {
            console.log("You clicked me");
          }
        },
        {
          text: 'Good',
          icon: 'medical',
          handler: () => {
            console.log("You added me");
          }
        },
        {
          text: 'Problem?',
          icon: 'medical',
          handler: () => {
            console.log("You added me");
          }
        },
      ]  
    });
    await actionSheet.present();
  }

  async account() {
    this.router.navigate(['/account'])

  }

}
