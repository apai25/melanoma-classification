import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';

import { Router } from '@angular/router'

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  firstname: string=""

  constructor(public alert: AlertController, public router: Router) { }

  ngOnInit() {
  }

  async submit() {
    localStorage.setItem('firstname', this.firstname);
    this.showAlert("Updated!", "")
  }
  
  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["Ok"]
    })

    await alert.present()
  }

  async account() {
    this.router.navigate(['/account'])

  }

}

