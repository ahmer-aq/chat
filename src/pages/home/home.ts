import { Component } from '@angular/core';
import { NavController, LoadingController,AlertController, Platform, ToastController, App, ActionSheetController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';

// PAGES
import { LoginPage } from '../login/login';
import { FriendListPage } from '../friend-list/friend-list';
import { MessagesListPage } from '../../pages/messages-list/messages-list';
import { AppDataServiceProvider } from '../../providers/app-data-service/app-data-service';
import { FollowBackPage } from '../../pages/follow-back/follow-back';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SearchUserPage } from '../../pages/search-user/search-user';

declare var cordova:any;


// THIRD PARTY LIBRARIES
// import { vintagejs } from 'vintagejs/dist/vintage.min.js';
// import { Caman } from 'camanjs/dist/caman.js';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  // directives:[MapDirective]
})
export class HomePage {



	public id;
	public base64Image : string;
	public photo 	   : string;
	public map;
	public name;
	public userProfileImage;
	public canvasWidth;
	public canvasHight;
	public newMessages;
	public messagesList;
	public oldMessageCount;
	spinner;
	onboarding;

	RefreshInterval;
  	refreshIntervalTime = 10000; //10sec

	cameraOptions: CameraOptions = 
	{
		// 1024 x 640
		targetWidth: this.platform.width(),
		targetHeight: this.platform.height(),
		quality: 100,
		// allowEdit:true,
		destinationType: this.camera.DestinationType.DATA_URL,
		encodingType: this.camera.EncodingType.JPEG,
		mediaType: this.camera.MediaType.PICTURE,

   		correctOrientation: true

	}

  constructor(	public navCtrl: NavController, 
  				public alertCtrl: AlertController,
  				public loading: LoadingController,
              	private storage: Storage,
              	private toast: ToastController,
              	private app: App,
              	public actionSheetCtrl: ActionSheetController,
    			public camera: Camera,
    			public platform: Platform,
   				private DataService: AppDataServiceProvider,
    			private backgroundMode: BackgroundMode,
    			private localNotifications: LocalNotifications
  			) {
  			 this.storage.get('user').then((data) => 
  			 {
  			 	if (data)
  			 	{
  			 
  			 			this.id  = data.id;
  			 			this.userProfileImage  = data.profile_picture;

  			 	}else{
         			this.userProfileImage = '../../assets/icon/marker.png';
  			 		console.log('ID IS NULL, FIND SOME SOLUTION PLEASE');
  			 		//this.navCtrl.push(LoginPage);
	   				this.app.getRootNav().setRoot(LoginPage);

  			 	}
  			 	
  			 });
  			}

  	ionViewDidLeave() { clearInterval(this.RefreshInterval); }
  	ionViewDidEnter()
  	{
  		var that = this;

	  	this.RefreshInterval = setInterval(function() 
	    {
	  		if (that.id)
	  		{
		  	   that.DataService.UserMessagesList(that.id)
			    .then(Response => 
			    {
			    	let temp : any  = Response;
			        that.newMessages = temp.newMessageCount;
			        that.messagesList = temp.messagesList;
			    });
	  		}

	  	}, this.refreshIntervalTime);
  	}

	ionViewDidLoad() 
	{
		this.canvasWidth = this.platform.width();
		this.canvasHight = this.platform.height();

		console.log(this.newMessages);
		console.log(this.messagesList);

	}
  	showLoading(){this.spinner =  this.loading.create({content: "Please wait..."});this.spinner.present();}
   	hideLoading(){ this.spinner.dismiss(); }



	
	drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) 
	{

	    if (arguments.length === 2) {
	        x = y = 0;
	        w = ctx.canvas.width;
	        h = ctx.canvas.height;
	    }

	    /// default offset is center
	    offsetX = typeof offsetX === 'number' ? offsetX : 0.5;
	    offsetY = typeof offsetY === 'number' ? offsetY : 0.5;

	    /// keep bounds [0.0, 1.0]
	    if (offsetX < 0) offsetX = 0;
	    if (offsetY < 0) offsetY = 0;
	    if (offsetX > 1) offsetX = 1;
	    if (offsetY > 1) offsetY = 1;

	    var iw = img.width,
	        ih = img.height,
	        r = Math.min(w / iw, h / ih),
	        nw = iw * r,   /// new prop. width
	        nh = ih * r,   /// new prop. height
	        cx, cy, cw, ch, ar = 1;

	    /// decide which gap to fill    
	    if (nw < w) ar = w / nw;
	    if (nh < h) ar = h / nh;
	    nw *= ar;
	    nh *= ar;

	    /// calc source rectangle
	    cw = iw / (nw / w);
	    ch = ih / (nh / h);

	    cx = (iw - cw) * offsetX;
	    cy = (ih - ch) * offsetY;

	    /// make sure source rectangle is valid
	    if (cx < 0) cx = 0;
	    if (cy < 0) cy = 0;
	    if (cw > iw) cw = iw;
	    if (ch > ih) ch = ih;

	    /// fill image in dest. rectangle
	    ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
	}

	friendRequest() {
		let data = {user_id: this.id};
		this.navCtrl.push('FriendRequestListPage', data);
	}
	friendsList() {
		let data = {user_id: this.id};
		this.navCtrl.push(FriendListPage, data);
	}	
	followBack()
	{
		let data = {user_id: this.id};
		this.navCtrl.push(FollowBackPage, data);
	}
	login() {this.navCtrl.push(LoginPage);}
	searchFriend() 
	{
		let data = {user_id: this.id};
		this.navCtrl.push(SearchUserPage, data);
	}

	messenger() 
	{
		let data =
		{
			user_id: this.id,
			messagesList: this.messagesList
		};
		this.navCtrl.push(MessagesListPage, data);
	}	


	setUser()
	{

		this.storage.get('user').then((data) => 
		{
			console.log(data.name);
				this.toast.create
				({
	      			message:  data,
	      			duration: 3000
	    		}).present();
	  	});
	}


}
