import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FollowBackPage } from './follow-back';

@NgModule({
  declarations: [
    FollowBackPage,
  ],
  imports: [
    IonicPageModule.forChild(FollowBackPage),
  ],
  exports: [
    FollowBackPage
  ]
})
export class FollowBackPageModule {}
