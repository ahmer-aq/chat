import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FriendListPage } from './friend-list';

@NgModule({
  declarations: [
    FriendListPage,
  ],
  imports: [
    IonicPageModule.forChild(FriendListPage),
  ],
  exports: [
    FriendListPage
  ]
})
export class FriendListPageModule {}
