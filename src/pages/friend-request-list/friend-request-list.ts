import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppDataServiceProvider } from '../../providers/app-data-service/app-data-service';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the FriendRequestListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-friend-request-list',
  templateUrl: 'friend-request-list.html',
})
export class FriendRequestListPage  {
  names = [];
  tempNames = [];
  id = [];
  images = [];
  user_id;

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public DataService: AppDataServiceProvider,
   private storage: Storage,
                
   ) {
      //getParamID and check in local stroage: 
      //IF FOUND : GO LOCAL 
      //IF NOT FOUND : GHIT API

      this.user_id = this.navParams.get('user_id');
      if (this.user_id)
      {
        this.DataService.showFriendsRequest(this.user_id)
        .then(Responce => {
             console.log(Responce);
              this.storage.get('friendRequestList').then(
                   (list)=>{
                   if (list) {
                      for (var i =  0 ; i < list.length ; i++)
                      {
                       this.names[i] = list[i].name;
                       this.tempNames[i] = list[i].name;
                       this.images[i] = list[i].profile_picture;
                       this.id[i] = list[i].request_friend_id;
                      }
                        this.initializeItems();
                   }
                   else{
                        console.log('friendRequestList is empty');
                        this.initializeItems();
                   }
                  // this.DataService.friendList(friendList.id);
                });
        });

      }else{

      }   


  }
  initializeItems() 
  { 
    if (this.tempNames) {
      this.names = this.tempNames;
    }
  }

  sendRequest(){this.navCtrl.push('AddFriendPage');}

  rejectFriendRequest(friend_id)
  {
    console.log(friend_id);
    this.storage.get('user').then( 
    (userData)=>
    {
      this.DataService.rejectFriendRequest(userData.id, friend_id);
    });
  }

  acceptFriendRequest(friend_id)
  {
    console.log(friend_id);
    this.storage.get('user').then( 
    (userData)=>
    {
      this.DataService.acceptFriendRequest(userData.id, friend_id);
    });
  }

  search(ev) 
  {
      this.initializeItems();
      // set val to the value of the ev target
      var val = ev.target.value;
  

      // if the value is an empty string don't filter the names
      if (val && val.trim() != '') {
        this.names = this.names.filter((names) => {
          return (names.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }else{
        return 'No request';
      }
  }
}