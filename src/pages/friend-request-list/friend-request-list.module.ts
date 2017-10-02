import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FriendRequestListPage } from './friend-request-list';

@NgModule({
  declarations: [
    FriendRequestListPage,
  ],
  imports: [
    IonicPageModule.forChild(FriendRequestListPage),
  ],
  exports: [
    FriendRequestListPage
  ]
})
export class FriendRequestListPageModule {}
