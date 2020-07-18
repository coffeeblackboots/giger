import { Component, Pipe, PipeTransform } from '@angular/core';
import { NavController, NavParams, ModalController, IonicPage, Nav } from 'ionic-angular';

import { EventProvider } from "../../providers/event/event";
import { ProfileProvider } from "../../providers/profile/profile";

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { ViewgigPage } from '../viewgig/viewgig';

/**
 * Generated class for the SavedGigsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-saved-gigs',
  templateUrl: 'saved-gigs.html',
})
export class SavedGigsPage {

  public eventList: Array<any>;
  public bookmarkList: Array<any>;
  currentUser: firebase.User;

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public eventProvider: EventProvider,
    public profileProvider: ProfileProvider,
    public navParams: NavParams,
    public nav: Nav,
    ) 
  {
    firebase.auth().onAuthStateChanged( user => {
      if(user){
        this.currentUser = user;
      }});
  }

  ionViewDidLoad() {
    this.profileProvider.getUserDetails().child("saved").on("value", bookmarkListSnapshot => {
      this.bookmarkList = [];
      bookmarkListSnapshot.forEach(snap => {
        console.log("Bookmarks:"+snap.val().postId);
        this.bookmarkList.push({
          postIdBookMark: snap.val().postId,
        });
        return false;
      });
      this.eventProviderList();
      /* Call made, hence list updated */
  });
  }


  eventProviderList(){
    var i;
    this.eventList = [];
    this.bookmarkList = this.bookmarkList.reverse();
    for(i=0;i<this.bookmarkList.length;i++){
        console.log("EventProviderListFunction::: Bookmark::"+this.bookmarkList[i].postIdBookMark);

        this.eventProvider.getEventList().orderByChild("postId").equalTo(this.bookmarkList[i].postIdBookMark).on("value", eventListSnapshot => {

          eventListSnapshot.forEach(snap => {
              console.log("Company Name"+snap.val().cmpName);
          
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
          bookmark: true,
          });
          return false; 
          });
        });
      
    }

  }

  /* Remove Book Marking Post */
  removeBookmarkEvent(postedEventKey){
    console.log(postedEventKey);
    this.profileProvider.getUserDetails().child('saved/'+postedEventKey).remove();
    this.ionViewDidLoad();
  }

  viewCompleteEvent(eventId:string){
    this.nav.push(ViewgigPage,{eventIdForViewPage:eventId});
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
