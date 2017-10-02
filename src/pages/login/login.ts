import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import { AppDataServiceProvider } from '../../providers/app-data-service/app-data-service';
import { Facebook } from '@ionic-native/facebook';

import { SignUpPage } from '../sign-up/sign-up';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email;
  password;
  gb_image = "assets/icon/logo.png";
  faceBookToken;
  faceBookUserId;
  error;
  
  
  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public loadingCtrl: LoadingController,
    private DataService: AppDataServiceProvider,
    private toast: ToastController,
    private Facebook: Facebook
  	) 
  {
  	//
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signUp(){ this.navCtrl.push(SignUpPage); }

  login()
  {
    if (this.email && this.password) {
      this.DataService.Login(this.email, this.password);
    }
    else{
        this.toast.create
        ({
              message:  'Enter email address and password' ,
              duration: 5000
          }).present();
      }
    // let loader = this.loadingCtrl.create({
    //   content: "EMAIL : " + this.email + " PASSWORD : " + this.password,
    //   duration: 13000
    // });
    // loader.present();
  }
  facebookLogin()
  {
   this.Facebook.login(['public_profile', 'user_friends', 'email'])
     .then(data=>{
       this.faceBookToken=data.authResponse.accessToken;
       this.faceBookUserId=data.authResponse.userID;

       //Call getter function
       this.onGetDetailsClick();
     } )
      .catch(e => {
        this.error = JSON.stringify(e);
        alert(JSON.stringify(e));
      } );
  }


 onGetDetailsClick()
 {
   this.Facebook.api(this.faceBookUserId+"/?fields=name,id,email,picture,birthday,gender",['public_profile']).then(data=>{
      var email, picture, name, id, facebook_auth_id;

      // picture = JSON.stringify(data.picture.data.url);
      id = data.id;
      picture = "http://graph.facebook.com/" + id + "/picture?width=300";
      email = (data.email) ? data.email : id;
      facebook_auth_id = id;
      name = data.name;

      // picture = '===';
      // name = 'ahmer ali ali';
      // email = 'ahmer@yahoo.com';
       // alert(JSON.stringify(data));

      this.DataService.FacebookLogin(name, email , picture, facebook_auth_id);
   });
 }//onGetDetailsClick()


}
