import { Component, ViewChild, Pipe } from '@angular/core';
import { Nav, Platform, App, Content } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
  
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SavedGigsPage } from '../pages/saved-gigs/saved-gigs';
import { SignupPage } from '../pages/signup/signup';
import { Profile2Page } from '../pages/profile2/profile2';
import { Profile1Page } from '../pages/profile1/profile1';
import { Profile3Page } from '../pages/profile3/profile3';
import { MainPage } from '../pages/main/main';
import { PortfolioPage } from '../pages/portfolio/portfolio';
import { AwardedGigsPage } from '../pages/awarded-gigs/awarded-gigs';
import { AppliedGigsPage } from '../pages/applied-gigs/applied-gigs';
import { SliderPage } from '../pages/slider/slider';
import { PersonalDetailsViewPage } from '../pages/personal-details-view/personal-details-view';
import { SkillsDetailsViewPage } from '../pages/skills-details-view/skills-details-view';

import { AuthProvider } from '../providers/auth/auth';

// Firebase Imports 
import firebase from 'firebase/app';
import 'firebase/auth';
import { PassbookDetailsViewPage } from '../pages/passbook-details-view/passbook-details-view';
import { PortfolioDetailsViewPage } from '../pages/portfolio-details-view/portfolio-details-view';
import { AwardedgigviewPage } from '../pages/awardedgigview/awardedgigview';
import {ScrollingHeaderModule} from 'ionic-scrolling-header'; //Scrolling Header

import { AndroidFullScreen } from '@ionic-native/android-full-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild(Content) content: Content;
  rootPage: any;


  constructor(public platform: Platform, public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public authProvider: AuthProvider,
    public app: App,
    ) {
    firebase.initializeApp({
      apiKey: "AIzaSyBC8QZhr-z_6l1sYct45qE6fhIiABK_L6w",
      authDomain: "gigernetwork-e82ce.firebaseapp.com",
      databaseURL: "https://gigernetwork-e82ce.firebaseio.com",
      projectId: "gigernetwork-e82ce",
      storageBucket: "gigernetwork-e82ce.appspot.com",
      messagingSenderId: "460448862715"
    });
  // Firebase Credentials
  // Email ID: 
  

  const unsubscribe = firebase.auth().onAuthStateChanged(user => {
    if (!user){
      this.rootPage = MainPage;
      unsubscribe();
    } else {
      this.rootPage = AppliedGigsPage;
      unsubscribe();
    }
  });

}

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page);
  }

  personalDetails(){
    this.nav.push(PersonalDetailsViewPage);
  }

  skillsDetails(){
    this.nav.push(SkillsDetailsViewPage);
  }

  passbookDetails(){
    this.nav.push(PassbookDetailsViewPage);
  }

  portfolioDetails(){
    this.nav.push(PortfolioDetailsViewPage);
  }

  awardedGigs(){
    this.nav.setRoot(AwardedGigsPage);
  }

  home(){
    this.nav.setRoot(HomePage);
  }

  appliedGigs(){
    this.nav.setRoot(AppliedGigsPage);
  }

  savedGigs(){
    this.nav.setRoot(SavedGigsPage);
  }

  logout(){
    this.nav.setRoot(MainPage);
  }

  logOutUser(): void {
    this.authProvider.logoutUser().then(() => {
      this.app.getRootNav().setRoot(MainPage);
    });
  }

  
  
}



