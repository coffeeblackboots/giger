import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Profile3Page } from '../profile3/profile3';

/**
 * Generated class for the Profile2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile2',
  templateUrl: 'profile2.html',
})
export class Profile2Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile2Page');
  }

  profile3(){
    this.navCtrl.push(Profile3Page);
  }

}
