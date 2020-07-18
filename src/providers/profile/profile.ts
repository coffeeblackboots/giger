import { Injectable } from '@angular/core';
import firebase, { User } from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

@Injectable()
export class ProfileProvider {
  public userDetails: firebase.database.Reference;

  public currentUser: User;

  constructor() {
    firebase.auth().onAuthStateChanged( user => {
      if(user){
        this.currentUser = user;
        this.userDetails = firebase.database().ref(`/userProfile/${user.uid}`);
      }
    });
  }

  /* This Method provides Reference to User Profile */
  getUserDetails(): firebase.database.Reference {
    return this.userDetails;
  }

  /* Section 1: Methods for Personal Details Page */
  /* ************************************************************************************** */
  
  updateName(firstName: string, lastName: string): Promise<any> {
    return this.userDetails.child("profile").update({ firstName, lastName });
  }

  updateDOB(dob:string): Promise<any> {
    return this.userDetails.child("profile").update({ dob });
  }

  updateMobile(mobile:string): Promise<any> {
    return this.userDetails.child("profile").update({ mobile });
  }

  updateCity(city:string): Promise<any> {
    return this.userDetails.child("profile").update({ city });
  }

  updateAdhar(adhar:string): Promise<any> {
    return this.userDetails.child("profile").update({ adhar });
  }

  updateEmail(newEmail: string, password: string): Promise<any> {
    const credential: firebase.auth.AuthCredential = firebase.auth.
      EmailAuthProvider.credential(
        this.currentUser.email,
        password
      );
    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(user => {
        this.currentUser.updateEmail(newEmail).then(user => {
          this.userDetails.child("profile").update({ email: newEmail });
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  updatePassword(newPassword: string, oldPassword: string): Promise<any> {
    const credential: firebase.auth.AuthCredential = firebase.auth
      .EmailAuthProvider.credential(
        this.currentUser.email,
        oldPassword
      );

    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(user => {
        this.currentUser.updatePassword(newPassword).then(user => {
          console.log('Password Changed');
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  /* Section 1: Methods for Personal Details Page Ends Here*/
  /* ************************************************************************************** */



  /* ************************************************************************************** */

  /* Section 2: Methods for Skills and Education Details Page Starts*/

  /* ************************************************************************************** */
  
  updateSchool(schoolN:string): Promise<any> {
    return this.userDetails.child("skills").update({ schoolN });
  }

  updateJuniorCollege(juniorCN:string):Promise<any>{
    return this.userDetails.child("skills").update({juniorCN});
  }

  updateGraduationCollege(gradCN:string):Promise<any>{
    return this.userDetails.child("skills").update({gradCN});
  }

  updatePostGraduationCollege(pgCN:string):Promise<any>{
    return this.userDetails.child("skills").update({pgCN});
  }

  updateLanguage1(lang1:string):Promise<any>{
    return this.userDetails.child("skills").update({lang1});
  }

  updateLanguage2(lang2:string):Promise<any>{
    return this.userDetails.child("skills").update({lang2});
  }

  updateLanguage3(lang3:string):Promise<any>{
    return this.userDetails.child("skills").update({lang3});
  }

  /* Section 2: Methods for Skills & Education Details Page Ends Here*/
  /* ************************************************************************************** */

  /* ************************************************************************************** */

  /* Section 3: Methods for Passbook Details Page Starts*/

  /* ************************************************************************************** */

  updateAccountHolderNameProvider(acName:string):Promise<any>{
    return this.userDetails.child("passbook").update({acName});
  }

  updateAccountNumberProvider(acNo:string):Promise<any>{
    return this.userDetails.child("passbook").update({acNo});
  }

  updateBankNameProvider(bName:string):Promise<any>{
    return this.userDetails.child("passbook").update({bName});
  }

  updateIFSCProvider(ifsc:string):Promise<any>{
    return this.userDetails.child("passbook").update({ifsc});
  }

  updateUPIProvider(upi:string):Promise<any>{
    return this.userDetails.child("passbook").update({upi});
  }

  /* Section 3: Methods for Passbook Details Page Ends Here*/
  /* ************************************************************************************** */

  /* ************************************************************************************** */

  /* Section 4: Methods for Portfolio Images Page Starts*/

  /* ************************************************************************************** */
  addPhotoToPortfolio(dUrl:string):Promise<any>{
    return this.userDetails.child("portfolio").push({dUrl});
  }

  updateProfilePhoto(profileUrl:string):Promise<any>{
    return this.userDetails.child("profile").update({profileUrl});
  }
}
