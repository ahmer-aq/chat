import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AppDataServiceProvider } from '../../providers/app-data-service/app-data-service';
import { Storage } from '@ionic/storage';

import { ChatPage } from '../chat/chat';
import { ProfilePage } from '../profile/profile';
@IonicPage()
@Component({
  selector: 'page-messages-list',
  templateUrl: 'messages-list.html',
})
export class MessagesListPage
{
  user_id;
  userMessagesList;
  public tempText: any;
  public thread_id: any;
  public friendList: any;

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
  this.userMessagesList = this.navParams.get('messagesList');
  console.log( this.userMessagesList);

      // this.DataService.UserMessagesList(this.user_id)
      // .then(Response => 
      // {
      //     this.userMessagesList = Response;
      // });
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
          this.openChat(friend_id, friend_name, friend_image);
         }
       },
        {
         text: 'Delete',
         icon: 'ios-trash-outline',
         handler: () => {
          this.deleteFriend(friend_id)
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

  deleteFriend(friend_id)
  {


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
  openChat(friend_id, friend_name, friend_image)
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

}