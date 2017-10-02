import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { MyProfilePage } from '../pages/my-profile/my-profile';

declare var cordova:any;

import { Storage } from '@ionic/storage';
// import { BackgroundMode } from '@ionic-native/background-mode';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any, icon: string}>;
  userData: any;
  menu: boolean;
  // refreshIntervalTime = 10000;
  // oldMessageCount = 0;
  // newMessageCount = 0;
  constructor
  (
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private storage: Storage,
    public events: Events,
    // private backgroundMode: BackgroundMode
    ) {

    events.subscribe('refreshApp:userData', () => {
     this.userData = this.storage.get('user')
          .then((responeUserData)=>
          {
                 console.log(responeUserData);


           if (responeUserData)
           {
              this.userData = responeUserData;
              this.menu = true;
          
           }else
           {
             // alert(responeUserData);
             this.menu = false;
             this.userData.image = 'assets/icon/marker.png';
             this.userData.name = '';
           }
          this.ionViewDidLoad();

          });
    });
    this.initializeApp();
    this.ionViewDidLoad();
  }
 
  ionViewDidLoad()
  {
    this.userData = this.storage.get('user')
      .then((responeUserData)=>
      {
          
       if (responeUserData) 
      {

         
              this.userData = responeUserData;
              this.menu = true;
          this.userData = responeUserData;
         this.pages = [
        { title: 'Home', component: HomePage, icon : "ios-home-outline" },
        { title: 'Profile', component: MyProfilePage, icon : "ios-contact-outline" },
        { title: 'Logout', component: LogoutPage, icon : "ios-log-out-outline" },
      ];

       }else{
          this.pages = [
        { title: 'Login', component: LoginPage, icon : "ios-log-in-outline" },
      ];
         this.userData.image = 'assets/icon/marker.png';
         this.userData.name = '';
          let env = this;
          env.nav.setRoot(LoginPage);

       }
      });

  }


  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();

      this.splashScreen.hide();

    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
