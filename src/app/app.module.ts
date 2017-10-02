import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { ScreenOrientation } from '@ionic-native/screen-orientation';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { FriendListPage } from '../pages/friend-list/friend-list';
import { ProfilePage } from '../pages/profile/profile';
import { MessengerPage } from '../pages/messenger/messenger';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { MessageImageViewPage } from '../pages/message-image-view/message-image-view';
import { ChatPage } from '../pages/chat/chat';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { MessagesListPage } from '../pages/messages-list/messages-list';
import { FollowBackPage } from '../pages/follow-back/follow-back';
import { SearchUserPage } from '../pages/search-user/search-user';


import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { AppDataServiceProvider } from '../providers/app-data-service/app-data-service';
import { ImagePicker } from '@ionic-native/image-picker';
import { SocialSharing } from '@ionic-native/social-sharing';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { Facebook } from '@ionic-native/facebook';



@NgModule({
  declarations: [
    MyApp,

    HomePage,
    LoginPage,
    LogoutPage,
    FriendListPage,
    ProfilePage,
    MessengerPage,
    SignUpPage,
    MessageImageViewPage,
    ChatPage,
    MyProfilePage,
    MessagesListPage,
    FollowBackPage,
    SearchUserPage,
    
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    HomePage,
    LoginPage,
    LogoutPage,
    FriendListPage,
    ProfilePage,
    MessengerPage,
    SignUpPage,
    MessageImageViewPage,
    ChatPage,
    MyProfilePage,
    MessagesListPage,
    FollowBackPage,
    SearchUserPage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SpinnerDialog,
    Camera,
    Geolocation,
    PhotoLibrary,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppDataServiceProvider,
    Facebook,
    ImagePicker,
    ScreenOrientation,
    SocialSharing,
    BackgroundMode,
    LocalNotifications,

  ]
})
export class AppModule {}
