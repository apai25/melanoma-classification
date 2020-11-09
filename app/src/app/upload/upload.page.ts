import { Component } from '@angular/core';

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { storage } from 'firebase';
import * as firebase from 'firebase';
import { NgZone} from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';


export interface MyData {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})


export class UploadPage {
  

  task: AngularFireUploadTask;

  percentage: Observable<number>;

  snapshot: Observable<any>;

  UploadedFileURL: Observable<string>;

  images: Observable<MyData[]>;

  fileName:string;
  fileSize:number;

  isUploading:boolean;
  isUploaded:boolean;

  store;
  storageRef;
  imagesRef;
  yogaRef;

  img_src_string: any;

  imgpose: string;


  private imageCollection: AngularFirestoreCollection<MyData>;
  constructor(private storage: AngularFireStorage, private database: AngularFirestore, public zone: NgZone, public actionSheetController: ActionSheetController, private iab: InAppBrowser) {
    this.isUploading = false;
    this.isUploaded = false;
    this.imageCollection = database.collection<MyData>('meloImages');
    this.images = this.imageCollection.valueChanges();
    this.store = firebase.storage();
    this.storageRef = firebase.storage().ref();
    this.imagesRef = this.storageRef.child('output');
    

    var fileName = 'output.png';
    this.yogaRef = this.imagesRef.child(fileName);

  }
  getimg(){
    
    const browser = this.iab.create('https://firebasestorage.googleapis.com/v0/b/melclas.appspot.com/o/output%2Foutput?alt=media&token=1e3fdb1c-be68-421e-bf76-dd8e3ffff22b');

  }
  


  uploadFile(event: FileList) {

    

    var storage = firebase.storage();
    var outputRef = storage.ref('output/output');
    

    const file = event.item(0)

    if (file.type.split('/')[0] !== 'image') { 
     console.error('unsupported file type :( ')
     return;
    }

    this.isUploading = true;
    this.isUploaded = false;


    this.fileName = "melanoma";

    const path = `input/input`;

    const customMetadata = { app: 'Melo Image Upload Demo' };

    const fileRef = this.storage.ref(path);

    this.task = this.storage.upload(path, file, { customMetadata });

    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      
      finalize(() => {
        this.UploadedFileURL = fileRef.getDownloadURL();
        
        this.UploadedFileURL.subscribe(resp=>{
          this.addImagetoDB({
            name: file.name,
            filepath: resp,
            size: this.fileSize
          });
          this.isUploading = false;
          this.isUploaded = true;
        },error=>{
          console.error(error);
        })
      }),
      tap(snap => {
          this.fileSize = snap.totalBytes;
      })
    )
  }

  addImagetoDB(image: MyData) {
    const id = this.database.createId();

    this.imageCollection.doc(id).set(image).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log("error " + error);
    });
  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }
  

  


}