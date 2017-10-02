import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppDataServiceProvider } from '../../providers/app-data-service/app-data-service';
import { Storage } from '@ionic/storage';

import { ChatPage } from '../chat/chat';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-follow-back',
  templateUrl: 'follow-back.html',
})
export class FollowBackPage
{
  user_id;
  public followerList: any;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public DataService: AppDataServiceProvider,
      private storage: Storage,
   )
  {

  	this.user_id = this.navParams.get('user_id');

      this.DataService.FollowerList(this.user_id)
      .then(Response => 
      {
          this.followerList = Response;
      });
    }


  followBack(user_id, friend_id)
  {
	  this.DataService.Follow(user_id, friend_id);
  }
  friendProfile(friend_id)
  {
      let data = 
      {
        user_id: this.user_id,
        friend_id: friend_id
      };
      this.navCtrl.push(ProfilePage, data);

  }

}