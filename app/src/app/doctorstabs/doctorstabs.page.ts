import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { IonMenu } from '@ionic/angular';

@Component({
  selector: 'app-doctorstabs',
  templateUrl: './doctorstabs.page.html',
  styleUrls: ['./doctorstabs.page.scss'],
})
export class DoctorstabsPage implements OnInit {

  @ViewChild('tabs',  { static: true } ) tabs: IonTabs


  constructor() { }

  ngOnInit() {
    this.tabs.select('upload')
  }

}
