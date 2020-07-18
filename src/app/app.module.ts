import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Pipe, PipeTransform } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { SliderPage } from '../pages/slider/slider';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Profile1Page } from '../pages/profile1/profile1';
import { Profile2Page } from '../pages/profile2/profile2';
import { Profile3Page } from '../pages/profile3/profile3';
import { MainPage } from '../pages/main/main';
import { SavedGigsPage } from '../pages/saved-gigs/saved-gigs';
import { AppliedGigsPage } from '../pages/applied-gigs/applied-gigs';
import { AwardedGigsPage } from '../pages/awarded-gigs/awarded-gigs';
import { PortfolioPage } from '../pages/portfolio/portfolio';
import { FilterModalPage } from '../pages/filter-modal/filter-modal';
import { PersonalDetailsViewPage } from '../pages/personal-details-view/personal-details-view'
import { LocationSelectModalPage } from '../pages/location-select-modal/location-select-modal';
import { SkillsDetailsViewPage } from '../pages/skills-details-view/skills-details-view';
import { PassbookDetailsViewPage } from '../pages/passbook-details-view/passbook-details-view';
import { ViewgigPage } from '../pages/viewgig/viewgig';
import { PortfolioDetailsViewPage } from '../pages/portfolio-details-view/portfolio-details-view';

import { AuthProvider } from '../providers/auth/auth';
import { EventProvider } from '../providers/event/event';
import { ProfileProvider } from '../providers/profile/profile';

import {TimeAgoPipe} from 'time-ago-pipe';

import {NgPipesModule} from 'ngx-pipes';

import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';

import { AwardedgigviewPage } from '../pages/awardedgigview/awardedgigview';

import {ScrollingHeaderModule} from 'ionic-scrolling-header'; //Scrolling Header

import { LaunchNavigator } from '@ionic-native/launch-navigator';


@NgModule({
  declarations: [
    MyApp,
    SliderPage,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    Profile2Page,
    Profile1Page,
    Profile3Page,
    PortfolioPage,
    MainPage,
    SavedGigsPage,
    AppliedGigsPage,
    AwardedGigsPage,
    FilterModalPage,
    LocationSelectModalPage,
    PersonalDetailsViewPage,
    SkillsDetailsViewPage,
    PassbookDetailsViewPage,
    PortfolioDetailsViewPage,
    AwardedgigviewPage,
    ViewgigPage,
    TimeAgoPipe,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NgPipesModule,
    ScrollingHeaderModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SliderPage,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    Profile2Page,
    Profile1Page,
    Profile3Page,
    PortfolioPage,
    MainPage,
    SavedGigsPage,
    AppliedGigsPage,
    AwardedGigsPage,
    FilterModalPage,
    LocationSelectModalPage,
    PersonalDetailsViewPage,
    SkillsDetailsViewPage,
    PassbookDetailsViewPage,
    PortfolioDetailsViewPage,
    AwardedgigviewPage,
    ViewgigPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ProfileProvider,
    EventProvider,
    Camera,
    LaunchNavigator,
    ImagePicker,
  ],
})
export class AppModule {}
