import {Component, OnInit} from '@angular/core'
import { LoadingController, AlertController } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Observable} from 'rxjs';
import { Injectable} from '@angular/core';
import { Resolve } from '@angular/router';
import { logging } from 'protractor';
import { ActionSheetController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router'
import {ToastController } from '@ionic/angular';




@Component({
  selector: 'app-signup',
  templateUrl: './doctors-signup.page.html',
  styleUrls: ['./doctors-signup.page.scss'],
})

export class DoctorsSignupPage implements OnInit {

  usernamer: string=""
  passwordr: string=""
  cpassword: string=""

  dusernamer: string=""
  dpasswordr: string = ""
  dcpassword: string =""
  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router,
    public actionSheet: ActionSheetController,
    public toastCtrl: ToastController
    ) { }

  ngOnInit()  {

  }

  async register() {
    const { dusernamer, dpasswordr, dcpassword } = this
    if(dpasswordr !== dcpassword) {
      this.showAlert("Error!", "Password don't match")
      return console.error("Password don't match")
    } 

    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(dusernamer, dpasswordr)
      console.log(res)
      this.presentToast("User was added Successfully, try logging in!" , 3000)
     } catch(error) {
      console.dir(error)
      this.showAlert("Error", error.message)
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["Ok"]
    })

    await alert.present()
  }


  async presentToast(message: string, duration: number) {
    let toast = await this.toastCtrl.create({
      message,
      duration,
      position: 'bottom'
    })

    await toast.present()
  }
}