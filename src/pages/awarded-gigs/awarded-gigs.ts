import { Component, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, IonicPage, Nav, Content } from 'ionic-angular';

import { EventProvider } from "../../providers/event/event";
import { ProfileProvider } from "../../providers/profile/profile";

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { ViewgigPage } from '../viewgig/viewgig';
import { AwardedgigviewPage } from '../awardedgigview/awardedgigview';


/**
 * Generated class for the SavedGigsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-awarded-gigs',
  templateUrl: 'awarded-gigs.html',
})


export class AwardedGigsPage {
  
  public eventList: Array<any>;
  @ViewChild(Content) content: Content;
  public appliedList: Array<any>;
  currentUser: firebase.User;

  public firstname: string;

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
    this.profileProvider.getUserDetails().child("awarded").on("value", appliedListSnapshot => {
      this.appliedList = [];
      appliedListSnapshot.forEach(snap => {
        console.log("Applied:"+snap.val().postId);
        this.appliedList.push({
          postIdApplied: snap.val().postId,
        });
        return false;
      });
      this.eventProviderList();
      /* Call made, hence list updated */
  });


  // Getting User Details For Header
  this.profileProvider.getUserDetails().child("profile").on("value", firstnameSnapshot => {
    this.firstname=firstnameSnapshot.val().firstName;
    console.log(this.firstname);
  })
  }


  eventProviderList(){
    var i;
    this.eventList = [];
    this.appliedList = this.appliedList.reverse();
    for(i=0;i<this.appliedList.length;i++){
        console.log("EventProviderListFunction::: Applied::"+this.appliedList[i].postIdApplied);

        this.eventProvider.getEventList().orderByChild("postId").equalTo(this.appliedList[i].postIdApplied).on("value", eventListSnapshot => {

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
          gigStatus: snap.val().gStatus,
          gigPayment: snap.val().gPymt,
          });
          return false; 
          });
        });
      
    }

  }

  viewCompleteEvent(eventId:string){
    this.nav.push(AwardedgigviewPage,{eventIdForViewPage:eventId});
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


