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

/**
 * Generated class for the PassbookDetailsViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-passbook-details-view',
  templateUrl: 'passbook-details-view.html',
})
export class PassbookDetailsViewPage {

  public userPassbookDetails: any;

  public accountName: string;
  public accountNumber: string;
  public bankName: string;
  public IFSCCode: string;
  public upiID: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public profileProvider: ProfileProvider,
    ) {
  }

  ionViewDidLoad() {
    this.profileProvider.getUserDetails().child('passbook').on("value", userProfileSnapshot => {
      if(userProfileSnapshot.exists()) {  
      this.userPassbookDetails = userProfileSnapshot.val();
      this.accountName = userProfileSnapshot.val().acName;
      this.accountNumber = userProfileSnapshot.val().acNo;
      this.bankName = userProfileSnapshot.val().bName;
      this.IFSCCode = userProfileSnapshot.val().ifsc;
      this.upiID = userProfileSnapshot.val().upi;
      }
    });
  }

  updateAccountHolderName():void{
    const alert: Alert = this.alertCtrl.create({
      message: "Your Full Name",
      inputs: [
        {
          name:"accountName",
          placeholder:"Your Complete Name on Account",
          value: this.accountName
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Save",
          handler: data => {
            this.profileProvider.updateAccountHolderNameProvider(data.accountName);
          }
        }
      ]
    });
    alert.present();
  }

  updateAccountNumber(){
    const alert: Alert = this.alertCtrl.create({
      message: "Your Account Number",
      inputs: [
        {
          name:"accountNumber",
          placeholder:"Your Complete Account Number",
          value: this.accountNumber
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Save",
          handler: data => {
            this.profileProvider.updateAccountNumberProvider(data.accountNumber);
          }
        }
      ]
    });
    alert.present();
  }

  updateBankName(){
    const alert: Alert = this.alertCtrl.create({
      message: "Your Bank Name",
      inputs: [
        {
          name:"bankName",
          placeholder:"Your Bank Name",
          value: this.bankName
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Save",
          handler: data => {
            this.profileProvider.updateBankNameProvider(data.bankName);
          }
        }
      ]
    });
    alert.present();
  }

  updateIFSC(){
    const alert: Alert = this.alertCtrl.create({
      message: "Bank IFSC Code",
      inputs: [
        {
          name:"bankIFSC",
          placeholder:"Your Bank IFSC Code",
          value: this.IFSCCode
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Save",
          handler: data => {
            this.profileProvider.updateIFSCProvider(data.bankIFSC);
          }
        }
      ]
    });
    alert.present();
  }

  updateUPI(){
    const alert: Alert = this.alertCtrl.create({
      message: "Your UPI ID",
      inputs: [
        {
          name:"upiID",
          placeholder:"Your Complete UPI ID",
          value: this.upiID
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Save",
          handler: data => {
            this.profileProvider.updateUPIProvider(data.upiID);
          }
        }
      ]
    });
    alert.present();
  }

}
