import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessengerPage } from './messenger';

@NgModule({
  declarations: [
    MessengerPage,
  ],
  imports: [
    IonicPageModule.forChild(MessengerPage),
  ],
  exports: [
    MessengerPage
  ]
})
export class MessengerPageModule {}
