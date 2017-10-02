import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage
{
	userData;
  	constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage)
  	{
  	     this.userData = this.storage.get('user')
          .then((responeUserData)=>
          {
            console.log(responeUserData);
           if (responeUserData) {
              this.userData = responeUserData;
           }else{
             this.userData.image = 'assets/icon/marker.png';
             this.userData.name = '';
           }
          this.ionViewDidLoad();

          });
  	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
