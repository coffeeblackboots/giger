import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the LocationSelectModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-location-select-modal',
  templateUrl: 'location-select-modal.html',
})
export class LocationSelectModalPage {

  locations = [
    'Pune',
    'Mumbai',
    'Delhi',
    'Jaipur',
    'Banglore',
    'Goa',
    'Hyderabad',
    'Kochi',
    'Lucknow',    
  ];


  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationSelectModalPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  locationSelected(location: string) {
    console.log("Selected Item", location);
    this.viewCtrl.dismiss(location);
  }

}
