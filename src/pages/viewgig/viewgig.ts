import { Component,Pipe, PipeTransform } from '@angular/core';
import { IonicPage,ModalController,NavController,NavParams, Nav, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { FilterModalPage } from '../filter-modal/filter-modal';
import { LocationSelectModalPage } from '../location-select-modal/location-select-modal';

import { ToastController } from 'ionic-angular';

import { EventProvider } from "../../providers/event/event";
import { ProfileProvider } from "../../providers/profile/profile";

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
/**
 * Generated class for the ViewgigPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewgig',
  templateUrl: 'viewgig.html',
})
export class ViewgigPage {

  public eventList: Array<any>;
  public locationSelect: string = "Pune";
  public bookmarkList: Array<any>;

  public bookmarkValueBol: boolean;
  public appliedBol: boolean;
  public currentUser: firebase.User;
  public eventId: string;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public eventProvider: EventProvider,
              public profileProvider: ProfileProvider,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public nav: Nav) 
  {

    //Fetching " Event IDpassed " from Home Page : viewCompleteEvent() method
    this.eventId = navParams.get('eventIdForViewPage');
    console.log("Event ID passed from Home Page:"+this.eventId);

    firebase.auth().onAuthStateChanged( user => {
      if(user){
        this.currentUser = user;
        
      }});
  }

  ionViewDidLoad() {
  /* Retrieving Saved List from Particular User List and Reflecting it in the bookmark icon */
  /* If Bookmark is added, List is automatically refreshed and new list is reflected */
this.profileProvider.getUserDetails().child("saved").on("value", bookmarkListSnapshot => {
  this.bookmarkList = [];
  bookmarkListSnapshot.forEach(snap => {
    console.log("Bookmarks:"+snap.val().postId);
    if(snap.val().postId==this.eventId){
      console.log("This post is bookmark");
      this.bookmarkValueBol=true;
    }
  });
  /* Call made, hence list updated */
  this.eventProviderList();
});
  }

  eventProviderList(){

    this.profileProvider.getUserDetails().child("applied").on("value", appliedListSnapshot => {

      appliedListSnapshot.forEach(snap => {
        console.log("Applied:"+snap.val().postId);
        if(snap.val().postId==this.eventId){
          console.log("This post is applied");
          this.appliedBol=true;
        } 
      });
      /* Call made, hence list updated */
      return false;
  });

    this.eventProvider.getEventList().orderByChild("postId").equalTo(this.eventId).on("value", eventListSnapshot => {
      this.eventList = [];
      eventListSnapshot.forEach(snap => {

          this.eventList.push({
            id: snap.key,
            eventCompanyName: snap.val().cmpName,
            eventCompanyID: snap.val().cmpId,
            eventStatus: snap.val().eStatus,
            eventName: snap.val().eName,
            eventDescription: snap.val().eDes,
            eventCity: snap.val().eCity,
            startDate: snap.val().sDate,
            endDate: snap.val().eDate,
            startTime: snap.val().sTime,
            endTime: snap.val().eTime,
            maleRequired: snap.val().eMale,
            femaleRequired: snap.val().eFmale,
            eventAddress: snap.val().eAdr,
            breakfast: snap.val().incl.bfast,
            lunch: snap.val().incl.lunch,
            dinner: snap.val().incl.dinner,
            travel: snap.val().incl.travel,
            accomodation: snap.val().incl.acmdtn,
            postedBy: snap.val().postBy,
            perDayAmount: snap.val().rem,
            postDateTime: snap.val().postDate,
          });  
        return false;  
      });
    });
}


  /* Book Marking Post and Saving Post Key in the List */
  bookmarkEvent(postedEventKey){
    console.log(postedEventKey);
    this.profileProvider.getUserDetails().child('saved/'+postedEventKey).set({
      save: true,
      postId: postedEventKey,
    });
    this.bookmarkValueBol=true;
    this.snackBarBookmark();
  }

  /* Remove Book Marking Post */
  removeBookmarkEvent(postedEventKey){
    console.log(postedEventKey);
    this.profileProvider.getUserDetails().child('saved/'+postedEventKey).remove();
    this.bookmarkValueBol=false;
    this.snackBarRemoveBookmark();
  }


  /* Apply Button for Sending query to Apply */

  applyForEvent(postedEventKey){
    const confirm = this.alertCtrl.create({
      title: 'Apply for this Event',
      message: 'Click on agree to share your information with the Event Management Company for this GIG',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          cssClass: 'applyButtonViewGigPage',
          handler: () => {
            console.log('Agree clicked');
            this.applyForEventRegisterUserId(postedEventKey);
          }
        }
      ]
    });
    confirm.present();
  }

  applyForEventRegisterUserId(postedEventKey){
    console.log("This is ID of Applied GIG:::"+postedEventKey);
    this.profileProvider.getUserDetails().child('applied/'+postedEventKey).set({
      save: true,
      postId: postedEventKey,
    });

    this.eventProvider.getEventList().child(postedEventKey+'/applied/'+this.currentUser.uid).set({
      uid: this.currentUser.uid,
      time: new Date().toLocaleString(),
    });
  }


  snackBarBookmark(){
    let toast = this.toastCtrl.create({
      message: 'This Event is Bookmarked',
      duration: 3000,
      showCloseButton: true,
      closeButtonText: 'OK'
  });
  
  // Handle "undo" action
  /*
  toast.onDidDismiss((data, role) => {
      if (role == 'close') {
          yourRecoveringMethod();
      }
  });
  */
  toast.present();
  }

  snackBarRemoveBookmark(){
    let toast = this.toastCtrl.create({
      message: 'Bookmark Removed',
      duration: 3000,
      showCloseButton: true,
      closeButtonText: 'OK'
  });
  
  // Handle "undo" action
  /*
  toast.onDidDismiss((data, role) => {
      if (role == 'close') {
          yourRecoveringMethod();
      }
  });
  */
  toast.present();
  }

  }

  
  





