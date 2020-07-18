import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Profile2Page } from '../../pages/profile2/profile2';

/**
 * Generated class for the Profile1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile1',
  templateUrl: 'profile1.html',
})
export class Profile1Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile1Page');
  }

  profile2(){
    this.navCtrl.push(Profile2Page);
  }

}
