import { Component } from '@angular/core';
import {
  Alert,
  AlertController,
  IonicPage,
  Loading,
  LoadingController,
  NavController,
  NavParams
} from 'ionic-angular';

import { ProfileProvider } from '../../providers/profile/profile';


import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';

import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';
/**
 * Generated class for the PersonalDetailsViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-personal-details-view',
  templateUrl: 'personal-details-view.html',
})
export class PersonalDetailsViewPage {

  public userPersonalDetails: any;
  public dateOfBirth: string;
  public adhar: string;
  public imageUploadURL: string;

  public uid: string;

  imageResponse: any;
  options: any;



  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public camera: Camera,
    public profileProvider: ProfileProvider,
    public imagePicker: ImagePicker,
    ) {

      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.uid = user.uid;
        }
      });
  }

  ionViewDidLoad() {
    this.profileProvider.getUserDetails().child('profile').on("value", userProfileSnapshot => {
      this.userPersonalDetails = userProfileSnapshot.val();
      this.dateOfBirth = userProfileSnapshot.val().dob;
      this.adhar = userProfileSnapshot.val().adhar;
      console.log(this.userPersonalDetails.firstName);
      console.log(this.userPersonalDetails.lastName);
      console.log(this.userPersonalDetails.dob);
      console.log(this.userPersonalDetails.email);
      console.log(this.userPersonalDetails.mobile);
    });
  }

  updateName(): void {
    const alert: Alert = this.alertCtrl.create({
      message: "Your first name & last name",
      inputs: [
        {
          name: "firstName",
          placeholder: "Your first name",
          value: this.userPersonalDetails.firstName
        },
        {
          name: "lastName",
          placeholder: "Your last name",
          value: this.userPersonalDetails.lastName
        }
      ],
      buttons: [
        { text: "Cancel" },
        {
          text: "Save",
          handler: data => {
            this.profileProvider.updateName(data.firstName, data.lastName);
          }
        }
      ]
    });
    alert.present();
  }

  updateMobile(): void {
    const alert: Alert = this.alertCtrl.create({
      message: "Your Mobile Number",
      inputs: [
        {
          name: "mobile",
          placeholder: "Your Mobile Number",
          value: this.userPersonalDetails.mobile
        }
      ],
      buttons: [
        { text: "Cancel" },
        {
          text: "Save",
          handler: data => {
            this.profileProvider.updateMobile(data.mobile);
          }
        }
      ]
    });
    alert.present();
  }

  updateAdhar(): void {
    const alert: Alert = this.alertCtrl.create({
      message: "Your Adhaar Number",
      inputs: [
        {
          name: "adhar",
          placeholder: "Your Adhaar Number",
          value: this.userPersonalDetails.adhar
        }
      ],
      buttons: [
        { text: "Cancel" },
        {
          text: "Save",
          handler: data => {
            this.profileProvider.updateAdhar(data.adhar);
          }
        }
      ]
    });
    alert.present();
  }

  updateCity(): void {
    const alert: Alert = this.alertCtrl.create({
      message: "Your Current City",
      inputs: [
        {
          name: "city",
          placeholder: "Your City",
          value: this.userPersonalDetails.city
        }
      ],
      buttons: [
        { text: "Cancel" },
        {
          text: "Save",
          handler: data => {
            this.profileProvider.updateCity(data.city);
          }
        }
      ]
    });
    alert.present();
  }

  updateDOB(birthDate:string):void {
    this.profileProvider.updateDOB(birthDate);
  }

  
  updateEmail(): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [{ name: 'newEmail', placeholder: 'Your new email' },
      { name: 'password', placeholder: 'Your password', type: 'password' }],
      buttons: [
        { text: 'Cancel' },
        { text: 'Save',
          handler: data => {
            this.profileProvider
              .updateEmail(data.newEmail, data.password)
              .then(() => { console.log('Email Changed Successfully'); })
              .catch(error => { console.log('ERROR: ' + error.message); });
        }}]
    });
    alert.present();
  }

  updatePassword(): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [
        { name: 'newPassword', placeholder: 'New password', type: 'password' },
        { name: 'oldPassword', placeholder: 'Old password', type: 'password' }],
      buttons: [
        { text: 'Cancel' },
        { text: 'Save',
          handler: data => {
            this.profileProvider.updatePassword(
              data.newPassword,
              data.oldPassword
            );
          }
        }
      ]
    });
    alert.present();
  }

  async uploadProfilePhoto(): Promise<any> {

    this.camera.getPicture({
      destinationType : this.camera.DestinationType.DATA_URL,
      sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit : true,
      encodingType: this.camera.EncodingType.PNG,
      targetHeight: 600,
      targetWidth: 600,
      saveToPhotoAlbum: true
    }).then(profilePicture => {
      const profileRef = firebase.storage().ref(`${this.uid}/profilePicture.png`);
      profileRef.putString(profilePicture, 'base64', {contentType: 'image/png'}).then(savedProfilePicture => {
        
        savedProfilePicture.ref.getDownloadURL().then((url) => {
          this.profileProvider.updateProfilePhoto(url);
         });
        
      });
    }, error => {
      // Log an error to the console if something goes wrong.
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }
    
    
    

     

}




