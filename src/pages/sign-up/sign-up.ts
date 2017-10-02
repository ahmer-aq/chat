import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams, ToastController, Platform, Content} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';


import { AppDataServiceProvider } from '../../providers/app-data-service/app-data-service';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage 
{
  @ViewChild('myContent') content: Content;
  public canvasWidth;
  public canvasHight;
  userData;
  
  id;
  profile_picture;
  name;
  email;
  password;
  facebook_auth_id;
  private file : FormGroup;
  image;

  faceBookToken;
  faceBookUserId;
  error;

  spinner;
  options = 
  {
    maximumImagesCount: 1,
    width: 200,
    // height: 300,
    quality: 100,
    outputType: 1
  }
  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private DataService: AppDataServiceProvider,
    private storage: Storage,
    private toast: ToastController,
    public platform: Platform,
    public loading: LoadingController,
    private formBuilder: FormBuilder
    ) 
   {

     this.file = this.formBuilder.group({
            image: ['']
        });

	  	this.userData = this.storage.get('user')
        .then((responeUserData)=>
      {
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
    this.canvasWidth = this.platform.width() /  1.5;
    this.canvasHight = this.platform.width() /  1.5;
  }


  signUp()
  {
    if (this.name && this.email  && this.password && this.profile_picture)
    {
      this.DataService.FacebookSignUp(this.name, this.email, this.password, this.profile_picture, this.facebook_auth_id)
      .then(response=>{
        if (response == 'error')
        {
          this.password = null;
          this.facebook_auth_id = null;
        }
      });
    }else
    {
     this.toast.create
      ({
            message:  'Enter information' ,
            duration: 5000,
            position: 'top'
      }).present();
    }
  }


  changeListener($event) : void {
  this.readThis($event.target);
}

readThis(inputValue: any): void {
  var file:File = inputValue.files[0];
  var myReader:FileReader = new FileReader();
  var that = this;
  myReader.onloadend = (e) => {
    that.profile_picture = myReader.result;
  }
  myReader.readAsDataURL(file);
}


  // logForm()
  // {
    // console.log('event');
// 
    // var reader = new FileReader();
    // reader.onload = function (e)
    // {
    //     var data = this.result;
    // }
    // reader.readAsDataURL( event );


    // var file = this.files[0];
    // var reader  = new FileReader();
    // reader.onloadend = function () {
    //   cb(reader.result);
    // }
    // reader.readAsDataURL(file);


  // }
    logForm()
    {

      // var file = this.file[0].value;
      console.log(this.image);
      // console.log(this.file.value);
      // var reader = new FileReader();
      // reader.onload = function (e)
      // {
      //   var data = this.result;
      // console.log(reader);

      // }
      // reader.readAsDataURL(this.file.value);
    }


  ConvertImgToBase64URL()
  {
    var canvas : any = document.getElementById("canvas");
    let ctx =  canvas.getContext('2d');
    var img = document.getElementById("profile_picture");
    ctx.drawImage(img, 30, 30);
      return canvas.toDataURL();
  }
  showLoading(){this.spinner =  this.loading.create({content: "Please wait..."});this.spinner.present();}
  hideLoading(){ this.spinner.dismiss(); }

}
