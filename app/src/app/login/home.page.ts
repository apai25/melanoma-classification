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
import * as firebase from 'firebase';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {ToastController } from '@ionic/angular';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore"


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  username: string=""
  password: string=""

  usernamer: string=""
  passwordr: string=""
  cpassword: string=""
  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router,
    public actionSheet: ActionSheetController,
    public toastCtrl: ToastController,
    public fs: AngularFirestore,
    ) { }

  ngOnInit()  {

  }

  async login() {
    const { username, password } = this
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password)
      localStorage.setItem('userid', this.afAuth.auth.currentUser.uid);
      this.showAlert("Logged In!", " Be sure to update your information under the account page!")
      this.router.navigate(['/dashboard'])
     } catch(err) {
      console.dir(err)
      if(err.code === "auth/wrong-password") {
        console.log("wrong password")
        this.showAlert("Incorrect Password", err.message)
      }
      if(err.code === "auth/user-not-found") {
        console.log("user not found")
        this.showAlert("Error user not found", err.message)
      }
    }
  }

  async recover() {
    this.afAuth.auth.sendPasswordResetEmail(this.username)
    if(this.username == "") {
      this.showAlert("Error no email given", "Please fill out email field")
    } else {
      this.presentToast('Password reset email sent', 3000);
    }
  }

  async presentToast(message: string, duration: number) {
    let toast = await this.toastCtrl.create({
      message,
      duration,
      position: 'bottom'
    })

    await toast.present()
  }



  async register() {
    const { usernamer, passwordr, cpassword } = this
    if(passwordr !== cpassword) {
      this.showAlert("Error!", "Password don't match")
      return console.error("Password don't match")
    } 

    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(usernamer + '@gmail.com', passwordr)
      console.log(res)
      this.showAlert("Success!", "welcome aboard!")
      this.router.navigate(['/tabs'])
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
          text: 'Stanford Medical Foundation',
          icon: 'medical',
          handler: () => {
            console.log("You added me");
          }
        },
        {
          text: 'Sutter Health',
          icon: 'medical',
          handler: () => {
            console.log("You added me");
          }
        },
        {
          text: 'Palo Alto Medical Foundation',
          icon: 'medical',
          handler: () => {
            console.log("You added me");
          }
        },
        {
          text: 'Kaiser Permanente',
          icon: 'medical',
          handler: () => {
            console.log("You added me");
          }
        },
        {
          text: 'John Muir',
          icon: 'medical',
          handler: () => {
            console.log("You added me");
          }
        }
      ]  
    });
    await actionSheet.present();
  }
}
