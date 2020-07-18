import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PortfolioPage } from '../portfolio/portfolio';

/**
 * Generated class for the Profile3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile3',
  templateUrl: 'profile3.html',
})
export class Profile3Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile3Page');
  }

  portfolio(){
    this.navCtrl.push(PortfolioPage);
  }

}
