import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Profile1Page } from '../profile1/profile1';

/**
 * Generated class for the SliderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-slider',
  templateUrl: 'slider.html',
})
export class SliderPage {
  slides = [
    {
      title: "Build PortFolio",
      description: "Easily build your portfolio, add your details. Let everyone know your worth.",
      image: "../../assets/imgs/slider1.png",
    },
    {
      title: "Discover",
      description: "Browse numerous Events that can are happening in your Locality. Discover which events can lead you to higher returns.",
      image: "../../assets/imgs/slider2.png",
    },
    {
      title: "APPLY FOR GIGs",
      description: "After you’ve browsed various Events, choose which event you want to work for, simply click on Interested and your Profile will be shared with the Event Organisers.",
      image: "../../assets/imgs/slider3.png",
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SliderPage');
  }


  exitSlider(){
    this.navCtrl.setRoot(Profile1Page);
  }

}
