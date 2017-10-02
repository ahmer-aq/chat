import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppDataServiceProvider } from '../../providers/app-data-service/app-data-service';
import { Storage } from '@ionic/storage';

import { ChatPage } from '../chat/chat';
/*************************************************
account_type       :   "free"
address            :   null
auth_token         :   "aggavr2D4pfPXdTImI1sD3BinJAQFwZojNSaCbNE"
bio                :   null
created_at         :   "2017-08-17 20:54:01"
date_of_birth      :   null
deleted_at         :   null
devices            :   null
email              :   "sorn@gmail.com"
friends_count      :   "0"
gender             :   null
id                 :   2
ip                 :   null
name               :   "Hillard Lebsack"
phone              :   null
profile_likes      :   "0"
profile_picture    :   "http://lorempixel.com/gray/600/480/people/Faker/?31224"
profile_views      :   "0"
role               :   "user"
status             :   "1"
updated_at         :   "2017-08-17 20:54:01"
 *************************************************/
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage
{
	userData;
  user_id;
  friend_id;
  canChat;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public DataService: AppDataServiceProvider,
    public storage: Storage,
    )
    {
      this.user_id = this.navParams.get('user_id');
      this.friend_id = this.navParams.get('friend_id');
      this.canChat = this.navParams.get('canChat');

      this.DataService.ViewProfile(this.user_id, this.friend_id)
      .then(response => { console.log(response);this.userData = response});
         // this.userData.image = 'assets/icon/marker.png';
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  openChat()
  {
    let data = 
    {
      user_id   : this.user_id,
      friend_id : this.friend_id,
      name      : this.userData.name,
      image     : this.userData.profile_picture
    };
    this.navCtrl.push(ChatPage, data);
  }
}