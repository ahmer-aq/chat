import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AppDataServiceProvider } from '../../providers/app-data-service/app-data-service';
import { Storage } from '@ionic/storage';

import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-search-user',
  templateUrl: 'search-user.html',
})

export class SearchUserPage
{
  user_id;
  email;
  friendData;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public DataService: AppDataServiceProvider,
      public toast: ToastController,
      private storage: Storage,
   )
   { this.user_id = this.navParams.get('user_id'); }


	friendProfile(friend_id)
	{
	  let data = 
	  {
	    user_id: this.user_id,
	    friend_id: friend_id
	  };
	  this.navCtrl.push(ProfilePage, data);
	}
	follow()
	{
		if (this.user_id && this.friendData.id) {
			console.log(this.user_id +' : '+ this.friendData.id);
			
			this.DataService.Follow( this.user_id, this.friendData.id)
			.then((response) => 
	    	{
	    		if (response != 'error')
	    		{
					this.navCtrl.pop();
	    		}
	    	});
		}
		else
		{
			this.toast.create
	        ({
	            message:  'error' ,
	            duration: 5000
	        }).present();
		}

	}
  	search()
	{
	    if (this.email)
	    {
	        this.DataService.SearchFriend( this.user_id , this.email)
	        .then((response) => 
	        	{
	        		if (response != 'error')
	        		{
						this.friendData = response;
	        		}
	        	});
	    }else
	    {
	        this.toast.create
	        ({
	            message:  'Enter friend username or email address' ,
	            duration: 5000
	       }).present();
	   }
	}
}