import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SavedGigsPage } from './saved-gigs';

@NgModule({
  declarations: [
    SavedGigsPage,
  ],
  imports: [
    IonicPageModule.forChild(SavedGigsPage),
  ],
})
export class SavedGigsPageModule {}