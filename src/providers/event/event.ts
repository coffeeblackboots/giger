import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

@Injectable()  
export class EventProvider {
  public eventListRef: firebase.database.Reference;
  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.eventListRef = firebase.database().ref(`/eventList`);
      }
    });
  }

 
  getEventList(): firebase.database.Reference {
    return this.eventListRef;
  }

  

}