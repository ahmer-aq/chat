import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageImageViewPage } from './message-image-view';

@NgModule({
  declarations: [
    MessageImageViewPage,
  ],
  imports: [
    IonicPageModule.forChild(MessageImageViewPage),
  ],
  exports: [
    MessageImageViewPage
  ]
})
export class MessageImageViewPageModule {}
