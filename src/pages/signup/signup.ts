import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {
  Alert,
  AlertController,
  IonicPage,
  Loading,
  LoadingController,
} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthProvider } from "../../providers/auth/auth";
import { EmailValidator } from "../../validators/email";

import { HomePage } from '../home/home';
import { SliderPage } from '../slider/slider';
import { MobileValidator } from '../../validators/mobile';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm: FormGroup;
  public loading: Loading;

  constructor(public navParams: NavParams,
      public navCtrl: NavController,
      public authProvider: AuthProvider,
      public loadingCtrl: LoadingController,
      public alertCtrl: AlertController,
      formBuilder: FormBuilder) {

        this.signupForm = formBuilder.group({
          email: [
            "",
            Validators.compose([Validators.required, EmailValidator.isValid])
          ],
          mobileNumberSignup: [
            "",
            Validators.compose([Validators.required, MobileValidator.isValid])
          ],
          password: [
            "",
            Validators.compose([Validators.minLength(8), Validators.required])
          ],
        });

      }


  /* Signing New User Function */

  signupUser(): void {
    if (!this.signupForm.valid) {
      console.log(
        `Need to complete the form, current value: ${this.signupForm.value}`
      );
    } else {
      const email: string = this.signupForm.value.email;
      const password: string = this.signupForm.value.password;
      const mobile: string = this.signupForm.value.mobileNumberSignup;
      console.log(email);
      console.log(password);
      console.log(mobile);

      this.authProvider.signupUser(email, password,mobile).then(
        user => {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot(HomePage);
          });
        },
        error => {
          this.loading.dismiss().then(() => {
            const alert: Alert = this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: "Ok", role: "cancel" }]
            });
            alert.present();
          });
        }
      );
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }
}
