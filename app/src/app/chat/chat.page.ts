import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from 'firebase';
import { Router } from '@angular/router'


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  text: string;
  chatRef: any; 
  uid: string;
  name: string;
  constructor(public af: AngularFireAuth, public fs: AngularFirestore,public router: Router) {
    this.uid=localStorage.getItem('userid');
    this.name=localStorage.getItem('firstname');
    this.chatRef = this.fs.collection('chats',ref=>ref.orderBy('Timestamp')).valueChanges();

   }

  send() {
    if(this.text != ''){

      this.fs.collection('chats').add({
        Name: localStorage.getItem('firstname'),
        Message: this.text,
        UserID: this.af.auth.currentUser.uid,
        Timestamp:firebase.firestore.FieldValue.serverTimestamp(),

      });
      this.text='';
    }
  }
  
  ngOnInit() {
  }

  async account() {
    this.router.navigate(['/account'])

  }
}
