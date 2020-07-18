import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import {
  Alert,
  AlertController,
  IonicPage,
  Loading,
  LoadingController,
  NavController,
  NavParams
} from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm: FormGroup;
  public loading: Loading;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public authProvider: AuthProvider,
              formBuilder: FormBuilder,) {
              
                this.loginForm = formBuilder.group({
                  email: [
                    '',
                    Validators.compose([Validators.required, EmailValidator.isValid])
                  ],
                  password: [
                    '',
                    Validators.compose([Validators.required, Validators.minLength(8)])
                  ]
                });

              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  homeFeed(){
    this.navCtrl.setRoot(HomePage);
  }

  loginUser(): void {
    if (!this.loginForm.valid) {
      console.log(
        `Form is not valid yet, current value: ${this.loginForm.value}`
      );
    } else {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.authProvider.loginUser(email, password).then(
        authData => {
          this.loading.dismiss().then(() => {
            console.log("New Login Path");
            this.navCtrl.setRoot(HomePage);
          });
        },  
        error => {
          this.loading.dismiss().then(() => {
            const alert: Alert = this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }]
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
