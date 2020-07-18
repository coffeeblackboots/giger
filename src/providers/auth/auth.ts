import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';



@Injectable()
export class AuthProvider {

  public leaderDetailRef: firebase.database.Reference;
  
  constructor() {
    
  }

  loginUser(email: string, password: string): Promise<any> {

    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  async signupUser(email: string, password: string, mobile: string): Promise<any> {
    try {
      const newUserCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      firebase.database().ref(`/userProfile/${newUserCredential.user.uid}/profile/email`).set(email);
      firebase.database().ref(`/userProfile/${newUserCredential.user.uid}/profile/mobile`).set(mobile);
    }
    catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  

  resetPassword(email:string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    const userId: string = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`/userProfile/${userId}`)
      .off();
    return firebase.auth().signOut();
  }
}
