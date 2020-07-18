import { Component,Pipe, PipeTransform } from '@angular/core';
import { IonicPage,ModalController,NavController,Nav } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { FilterModalPage } from '../filter-modal/filter-modal';
import { LocationSelectModalPage } from '../location-select-modal/location-select-modal';

import { EventProvider } from "../../providers/event/event";
import { ProfileProvider } from "../../providers/profile/profile";
import { ToastController } from 'ionic-angular';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { ViewgigPage } from '../viewgig/viewgig';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public eventList: Array<any>;
  public locationSelect: string = "Pune";
  public bookmarkList: Array<any>;

  public category: string; //for Storing Event Category Type

  public bookmarkValueBol: string;
  currentUser: firebase.User;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public eventProvider: EventProvider,
              public profileProvider: ProfileProvider,
              public toastCtrl: ToastController,
              public nav: Nav) 
  {
    firebase.auth().onAuthStateChanged( user => {
      if(user){
        this.currentUser = user;
      }});
  }
      
  viewCompleteEvent(eventId:string){
    this.nav.push(ViewgigPage,{eventIdForViewPage:eventId});
  }

  ionViewDidLoad() {
  /* Retrieving Saved List from Particular User List and Reflecting it in the bookmark icon */
  /* If Bookmark is added, List is automatically refreshed and new list is reflected */
    this.profileProvider.getUserDetails().child("saved").on("value", bookmarkListSnapshot => {
      this.bookmarkList = [];
      bookmarkListSnapshot.forEach(snap => {
        console.log("Bookmarks:"+snap.val().postId);
        this.bookmarkList.push({
          postIdBookMark: snap.val().postId,
          postIdBoolen: snap.val().save,
        });
        return false;
      });
      this.eventProviderList();
      /* Call made, hence list updated */
  });
  }

  eventProviderList(){
    this.eventProvider.getEventList().orderByChild("eCity").equalTo(this.locationSelect).on("value", eventListSnapshot => {
      this.eventList = [];
      eventListSnapshot.forEach(snap => {

        if(this.bookmarkList.find(bookmark => bookmark.postIdBookMark === snap.key)){
          console.log("BookMark For Post:"+snap.key);
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
            category: snap.val().cat,
            bookmark: true,
          });
        }
        else{
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
            category: snap.val().cat,
            bookmark: false,
          });
        }
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
    this.snackBarBookmark();
  }

  /* Remove Book Marking Post */
  removeBookmarkEvent(postedEventKey){
    console.log(postedEventKey);
    this.profileProvider.getUserDetails().child('saved/'+postedEventKey).remove();
    this.snackBarRemoveBookmark();
  }

  presentModal() {
    const modal = this.modalCtrl.create(FilterModalPage);
    modal.present();
  }

  locationModal() {
    const modal = this.modalCtrl.create(LocationSelectModalPage);
    modal.onDidDismiss(locationData => {
      console.log('MODAL DATA', locationData);
      
      
      if(locationData!=undefined){
        this.locationSelect = locationData;
        /* Call Made if Location is changed */
        this.eventProviderList();
      }
      else{
        this.eventProviderList();
      }
     });
    modal.present();
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

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value) {
      if (!value) return;

      return value.reverse();
    }
}
