import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AppDataServiceProvider } from '../../providers/app-data-service/app-data-service';
import { Storage } from '@ionic/storage';

import { ChatPage } from '../chat/chat';
import { ProfilePage } from '../profile/profile';


@IonicPage()
@Component({
  selector: 'page-friend-list',
  templateUrl: 'friend-list.html',
})
export class FriendListPage
{
  userFollowingList;
  user_id;
  waitingForRefresh = true;
  names;
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public DataService: AppDataServiceProvider,
      private storage: Storage,
      public actionSheetCtrl: ActionSheetController,
   )
  {
      //getParamID and check in local stroage: 
      //IF FOUND : GO LOCAL 
      //IF NOT FOUND : GHIT API

  this.user_id = this.navParams.get('user_id');
  // this.storage.get('friendList').then(
  //   (list)=>
  //   {
  //     if (list)
  //     {
  //       this.userFollowingList = list;
  //     }
  //     else
  //     {
  //         console.log('friendList is empty');
  //     }
  //   });

    this.DataService.FriendList(this.user_id)
    .then(response => 
    {
        this.waitingForRefresh = false;
        if (response == "error")
        { 
          console.log(response);
          this.waitingForRefresh = false;
          this.storage.set('friendList', null);
          this.userFollowingList = null;
          this.initializeItems();
        }
        else
        {
          this.storage.get('friendList').then(
           (list)=>
           {
             if (list)
             {
              this.userFollowingList = list;
              this.initializeItems();
             }
             else{
                  console.log('friendList is empty');
             }
          });
        }
    });
  }

  presentActionSheet(friend_id, friend_name, friend_image)
  {
    let actionSheet = this.actionSheetCtrl.create({
     title: 'Options',
     buttons: [
       {
         text: 'View Profile',
         icon: 'ios-contact-outline',
         handler: () => {
            this.friendProfile(friend_id)
         }
       },
       {
         text: 'Chat',
         icon: 'ios-chatbubbles-outline',
         handler: () => {
          this.sendMessage(friend_id, friend_name, friend_image);
         }
       },
        {
         text: 'Unfollow',
         icon: 'ios-trash-outline',
         handler: () => {
          this.Unfollow(friend_id)
          
         }
       },
       {
         text: 'Cancel',
         icon: 'ios-close-outline',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]
    });
    actionSheet.present();
  }  
  presentActionSheetWithoutChat(friend_id, friend_name, friend_image)
  {
    let actionSheet = this.actionSheetCtrl.create({
     title: 'Options',
     buttons: [
       {
         text: 'View Profile',
         icon: 'ios-contact-outline',
         handler: () => {
            this.friendProfile(friend_id)
         }
       },
        {
         text: 'Unfollow',
         icon: 'ios-trash-outline',
         handler: () => {
          this.Unfollow(friend_id)
         }
       },
       {
         text: 'Cancel',
         icon: 'ios-close-outline',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]
    });
    actionSheet.present();
  }

  Unfollow(friend_id)
  {
      this.DataService.Unfollow(this.user_id, friend_id);
      this.storage.set('friendList', null);

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
  sendMessage(friend_id, friend_name, friend_image)
  {
    // console.log('sendMessage :'+ friend_id +' - '+friend_name);

    this.storage.get('user').then( 
    (userData)=>
    {
      let data = 
      {
        user_id: userData.id,
        friend_id: friend_id,
        name: friend_name,
        image: friend_image
      };
        this.navCtrl.push(ChatPage, data);
    });
  }

  initializeItems() 
  { 
    if (this.userFollowingList)
    {
      this.names = this.userFollowingList.map(function(a) {return a.name;});
    }
  }

  search(ev)
  {
    this.initializeItems();
    var val = ev.target.value;
    if (val && val.trim() != '')
    {
      this.names = this.names.filter((names) => 
      {
        return (names.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
       console.log(this.names);
    }else
    {
      return 'No request';
    }
  }
}
