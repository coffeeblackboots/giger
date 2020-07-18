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
 * Generated class for the SkillsDetailsViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-skills-details-view',
  templateUrl: 'skills-details-view.html',
})
export class SkillsDetailsViewPage {

  public userSkillsDetails: any;

  public language1: string;
  public language2: string;
  public language3: string;
  public schoolName: string;
  public juniorCollege: string;
  public graduationCollege: string;
  public postGraduationCollege: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public profileProvider: ProfileProvider,
    ) {
  }

  ionViewDidLoad() {
    this.profileProvider.getUserDetails().child('skills').on("value", userSkillsSnapshot => {
      if(userSkillsSnapshot.exists()) {  
        this.userSkillsDetails = userSkillsSnapshot.val();
        this.language1 = userSkillsSnapshot.val().lang1;
        this.language2 = userSkillsSnapshot.val().lang2;
        this.language3 = userSkillsSnapshot.val().lang3;
        this.schoolName = userSkillsSnapshot.val().schoolN;
        this.juniorCollege = userSkillsSnapshot.val().juniorCN;
        this.graduationCollege = userSkillsSnapshot.val().gradCN;
        this.postGraduationCollege = userSkillsSnapshot.val().pgCN;
        }
    });
  }

  updateSchool(): void {
    const alert: Alert = this.alertCtrl.create({
      message: "Your School Name",
      inputs: [
        {
          name: "school",
          placeholder: "Your School Name",
          value: this.schoolName
        }
      ],
      buttons: [
        { text: "Cancel" },
        {
          text: "Save",
          handler: data => {
            this.profileProvider.updateSchool(data.school);
          }
        }
      ]
    });
    alert.present();
  }

  updateJuniorCollege(): void {
    const alert: Alert = this.alertCtrl.create({
      message: "Your Junior College Name",
      inputs: [
        {
          name: "juniorCN",
          placeholder: "Your Junior College Name",
          value: this.juniorCollege
        }
      ],
      buttons: [
        { text: "Cancel" },
        {
          text: "Save",
          handler: data => {
            this.profileProvider.updateJuniorCollege(data.juniorCN);
          }
        }
      ]
    });
    alert.present();
  }

  updateGraduationCollege(): void {
    const alert: Alert = this.alertCtrl.create({
      message: "Your Graduation College Name",
      inputs: [
        {
          name: "gradCN",
          placeholder: "Your Graduation College Name",
          value: this.graduationCollege
        }
      ],
      buttons: [
        { text: "Cancel" },
        {
          text: "Save",
          handler: data => {
            this.profileProvider.updateGraduationCollege(data.gradCN);
          }
        }
      ]
    });
    alert.present();
  }

  updatePostGraduationCollege(): void {
    const alert: Alert = this.alertCtrl.create({
      message: "Your Post Graduation College Name",
      inputs: [
        {
          name: "pgCN",
          placeholder: "Your Post Graduation College Name",
          value: this.postGraduationCollege
        }
      ],
      buttons: [
        { text: "Cancel" },
        {
          text: "Save",
          handler: data => {
            this.profileProvider.updatePostGraduationCollege(data.pgCN);
          }
        }
      ]
    });
    alert.present();
  }

  onSelectLanguage1(){
    this.profileProvider.updateLanguage1(this.language1);
  }

  onSelectLanguage2(){
    this.profileProvider.updateLanguage2(this.language2);
  }

  onSelectLanguage3(){
    this.profileProvider.updateLanguage3(this.language3);
  }

alertLanguage() {
  const alert = this.alertCtrl.create({
    title: 'Only Three Languages!',
    subTitle: 'Please Select Only Three Languages you are good at!',
    buttons: ['OK']
  });
  alert.present();
}


}

