import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AwardedGigsPage } from './awarded-gigs';

@NgModule({
  declarations: [
    AwardedGigsPage,
  ],
  imports: [
    IonicPageModule.forChild(AwardedGigsPage),
  ],
})
export class AwardedGigsPageModule {}