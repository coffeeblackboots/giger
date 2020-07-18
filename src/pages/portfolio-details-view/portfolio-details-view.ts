import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
import { ProfileProvider } from '../../providers/profile/profile';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';


/**
 * Generated class for the PortfolioDetailsViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-portfolio-details-view',
  templateUrl: 'portfolio-details-view.html',
})
export class PortfolioDetailsViewPage {

  public imagesPortfolio: Array<any>;

  public imageUploadURL: string;
  public uid: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public camera: Camera,
              public eventProvider: EventProvider,
              public profileProvider: ProfileProvider,) 
              {

                firebase.auth().onAuthStateChanged(user => {
                  if (user) {
                    this.uid = user.uid;
                  }
                });
              }

  ionViewDidLoad() {
    this.profileProvider.getUserDetails().child("portfolio").on("value", imagesPortfolioSnapshot =>{
      this.imagesPortfolio = [];
      imagesPortfolioSnapshot.forEach(snap=>{
        console.log(snap.val().dUrl);
        this.imagesPortfolio.push({
          imageUrl: snap.val().dUrl,
          caption: snap.val().cap
        });
        return false;
      });
    });
  }

  

  async uploadPortfolioImage(): Promise<any> {

    try{

     const options: CameraOptions = { 
       quality: 50,
       targetHeight: 600,
       targetWidth: 600,
       destinationType: this.camera.DestinationType.DATA_URL,
       encodingType: this.camera.EncodingType.JPEG,
       mediaType: this.camera.MediaType.PICTURE,
       correctOrientation: true,
     }

     var result =  await this.camera.getPicture(options);
     console.log(result.file.name);
     const image = `data:image/jpeg;base64,${result}`;
     this.imageUploadURL = image;

     var downloadFirebaseURL;


     firebase.storage().ref(`${this.uid}`).child(Date.now().toString()).putString(this.imageUploadURL, 'data_url', { contentType: 'image/png' })
       .then(savedPicture => {

         savedPicture.ref.getDownloadURL().then((url) => {
           downloadFirebaseURL = url;
           this.profileProvider.addPhotoToPortfolio(downloadFirebaseURL);
          });

         
       });
            
    }
    catch(e){
      console.error(e);
    }


}

}


