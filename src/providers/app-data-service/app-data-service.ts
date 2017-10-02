import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import {  App, ToastController, Events, LoadingController } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';
import { Facebook } from '@ionic-native/facebook';

@Injectable()

export class AppDataServiceProvider {
  public places;
  // public ApiRootURL = 'http://localhost/markr/public/';
  // public ApiRootURL = 'http://markr-env-1.jwy6dmy2vb.us-east-1.elasticbeanstalk.com/';
  public ApiRootURL = 'https://ahmeraq.com/chat/public/';
  spinner;
  user_id;


  constructor(
  	public http: Http, 
  	public storage : Storage, 
    private toast: ToastController,
    private app: App,
    private events: Events,
    private Facebook: Facebook,
  	public loading: LoadingController,

  	) {
    console.log('Hello PlacesDataServiceProvider Provider');

  }

  	ionViewDidLeave() { }
  	showLoading(){this.spinner =  this.loading.create({content: "Please wait..."});this.spinner.present();}
   	hideLoading(){ this.spinner.dismiss(); }
  	refresh()
	{
		window.location.reload(true);
    	this.app.getRootNav().setRoot(HomePage);
	}


	/* * * * * * * * * * * * * * * * * * * * * 
					Login Section 
	/* * * * * * * * * * * * * * * * * * * * */
	FacebookLogin(name, email, profile_picture, facebook_auth_id)
	{
    	this.showLoading();
	    let body = new FormData();
	    body.append('email', email);
	    body.append('name', name);
	    body.append('image', profile_picture);
	    body.append('facebook_auth_id', facebook_auth_id);
	    let headers = new Headers({});
	    let options = new Headers({ headers: headers });

		return new Promise(
			resolve => 
			{
			    this.http
		        .post(this.ApiRootURL + 'markr-facebook-login' , body)
			    .map(res => res.json())
			    .subscribe(
			      	response => 
			      	{

						this.hideLoading();
	            		this.statusCode({status:200, message:response.message});
						this.storage.set('user', response);
			         	this.user_id = response.id;
						this.events.publish('refreshApp:userData');
						this.app.getRootNav().setRoot(HomePage);
		            },
			        err => 
			        {
		            	this.hideLoading();
	            		this.statusCode(err);
	            	});
	  		});
	}

	Login(email, password)
	{
    	this.showLoading();
	    let body = new FormData();
	    body.append('email', email);
	    body.append('password', password);
	    let headers = new Headers({});
	    let options = new Headers({ headers: headers });
	    

		return new Promise(
			resolve =>
			{
			    this.http
		        .post(this.ApiRootURL + 'markr-login' , body)
			    .map(res => res.json())
			    .subscribe(
			      	response =>
					{
			         	this.hideLoading();
	            		this.statusCode({status:200, message:response.message});
			         	this.storage.set('user', response);
			         	this.user_id = response.id;
			         	this.events.publish('refreshApp:userData');
			    		this.app.getRootNav().setRoot(HomePage);
			      	},
			        err => 
			        {
			        	this.hideLoading();
	            		this.statusCode(err);
	            	});
	  		});
	}
	FacebookSignUp(name, email, password , profile_picture, facebook_auth_id )
	{
    	this.showLoading();
	    let body = new FormData();
	    body.append('name', name);
	    body.append('email', email);
	    body.append('password', password);
	    body.append('profile_picture', profile_picture);
	    body.append('facebook_auth_id', facebook_auth_id);
	    let headers = new Headers({});
	    let options = new Headers({ headers: headers });

		return new Promise(
			resolve => 
			{
			    this.http
		        .post(this.ApiRootURL + 'markr-facebook-signup' , body)
			    .map(res => res.json())
			    .subscribe(
			      	response => 
					{
						this.hideLoading();
	            		this.statusCode({status:200, message:response.message});
					 	this.storage.set('user', response);
						this.events.publish('refreshApp:userData');
						this.app.getRootNav().setRoot(HomePage);
					},
			        err => 
			        {
	      				this.hideLoading();
	            		this.statusCode(err);
		      			resolve('error');
	            	});
	  		});
	}


	logout()
	{
		this.storage.remove('user');
		this.storage.remove('friendRequestList');
		this.storage.remove('mystory');
		this.storage.remove('getUserLocation');
		this.storage.remove('places');
		this.storage.remove('friendList');
		// this.storage.clear();
		this.Facebook.logout().then(data=>{}).catch(error=>{});
		this.events.publish('refreshApp:userData');
	    // this.app.getActiveNav().push(LoginPage);
	}
	/* * * * * * * * * * * * * * * * * * * * * 
				Social
	/* * * * * * * * * * * * * * * * * * * * */


	SearchFriend(user_id, email)
	{
		this.showLoading();
	    let body = new FormData();
	    body.append('user_id', user_id);
	    body.append('email', email);
	    let headers = new Headers({});
	    let options = new Headers({ headers: headers });

		return new Promise(resolve => {
		    this.http.post(this.ApiRootURL + 'search-friend' , body)
		      .map(res => res.json())
		      .subscribe(
		      	response => 
		      	{
		      		this.hideLoading();
					this.statusCode({status:200, message:response.message});
		      		resolve(response);
		      	},
		       	err => 
		       	{
		      		this.hideLoading();
	            	this.statusCode(err);
		      		resolve('error');
	        	});
	  	});
	}
	Unfollow(user_id, friend_id)
	{
		this.showLoading();
	    let body = new FormData();
	    body.append('user_id', user_id);
	    body.append('friend_id', friend_id);
	    let headers = new Headers({});
	    let options = new Headers({ headers: headers });

		return new Promise(resolve => {
		    this.http.post(this.ApiRootURL + 'unfollow' , body)
		      .map(res => res.json())
		      .subscribe(
		      	response => 
		      	{
		      		this.hideLoading();
					this.statusCode({status:200, message:response.message});
		      		resolve(response);
		      	},
		       	err => 
		       	{
		      		this.hideLoading();
	            	this.statusCode(err);
	        	});
	  	});
	}
		Follow(user_id, friend_id)
	{
		this.showLoading();
	    let body = new FormData();
	    body.append('user_id', user_id);
	    body.append('friend_id', friend_id);
	    let headers = new Headers({});
	    let options = new Headers({ headers: headers });

		return new Promise(resolve => {
		    this.http.post(this.ApiRootURL + 'follow' , body)
		      .map(res => res.json())
		      .subscribe(
		      	response => 
		      	{
		      		this.hideLoading();
					this.statusCode({status:200, message:response.message});
		      		resolve(response);
		      	},
		       	err => 
		       	{
		      		this.hideLoading();
	            	this.statusCode(err);
		      		resolve('error');
	        	});
	  	});
	}
	FollowerList(user_id)
	{
		this.showLoading();
	    let body = new FormData();
	    body.append('user_id', user_id);
	    let headers = new Headers({});
	    let options = new Headers({ headers: headers });

		return new Promise(resolve => {
		    this.http.post(this.ApiRootURL + 'follower-list' , body)
		      .map(res => res.json())
		      .subscribe(
		      	response => 
		      	{
		      		this.hideLoading();
					this.statusCode({status:200, message:response.message});
		      		resolve(response);
		      	},
		       	err => 
		       	{
		      		this.hideLoading();
	            	this.statusCode(err);
	        	});
	  	});
	}
	FollowBack(user_id, friend_id)
	{
		this.showLoading();
	    let body = new FormData();
	    body.append('user_id', user_id);
	    body.append('friend_id', friend_id);
	    let headers = new Headers({});
	    let options = new Headers({ headers: headers });

		return new Promise(resolve => {
		    this.http.post(this.ApiRootURL + 'follow-back' , body)
		      .map(res => res.json())
		      .subscribe(
		      	response => 
		      	{
		      		this.hideLoading();
					this.statusCode({status:200, message:response.message});
		      		resolve(response);
		      	},
		       	err => 
		       	{
		      		this.hideLoading();
	            	this.statusCode(err);
	        	});
	  	});
	}
	FriendList(user_id)
	{
		this.showLoading();
	    let body = new FormData();
	    body.append('user_id', user_id);
	    let headers = new Headers({});
	    let options = new Headers({ headers: headers });

		return new Promise(resolve => {
		    this.http.post(this.ApiRootURL + 'friend-list' , body)
		      .map(res => res.json())
		      .subscribe(
		      	response => 
		      	{
		      		this.hideLoading();
		      		this.storage.set('friendList', null);
					this.storage.set('friendList', response);
	            	this.statusCode({status:200, message:response.message});
		      		resolve(response);
		      	},
		       	err => 
		       	{
		      		this.hideLoading();
	            	this.statusCode(err);
		      	 	resolve('error');

	        	});
	  	});
	}


	/* * * * * * * * * * * * * * * * * * * * * 
					Messages 
	/* * * * * * * * * * * * * * * * * * * * */
	ShareImageWithFriend(user_id, friend_id, image)
	{

		this.showLoading();
	    let body = new FormData();
	    body.append('user_id', user_id);
	    body.append('friend_id', friend_id);
	    body.append('message', image);
	    body.append('type', 'image');

	    let headers = new Headers({});
	    let options = new Headers({ headers: headers });

		return new Promise(resolve => {
		    this.http.post(this.ApiRootURL + 'share-image-with-friend' , body)
		      .map(res => res.json())
		      .subscribe(
		      	response => 
		      	{
		      		this.hideLoading();
					this.statusCode({status:200, message:response.message});
		      		resolve(response);
		      	},
		       	err => 
		       	{
		      		this.hideLoading();
	            	this.statusCode(err);
	        	});
	  	});
	}	

	SendMessage(user_id, friend_id, message, type)
	{

	    let body = new FormData();
	    body.append('user_id', user_id);
	    body.append('friend_id', friend_id);
	    body.append('message', message);
	    body.append('type', type);
	    let headers = new Headers({
	      // 'NDAPI-Key': 'XXXXXXXXX',
	      // 'NDAPI-Host': 'XXXXXXXXX' 
	  });
	    let options = new Headers({ headers: headers });

		return new Promise(resolve => {
		    this.http.post(this.ApiRootURL + 'send-message' , body)
		      .map(res => res.json())
		      .subscribe(
		      	response => {resolve(response);},
		      	err => { resolve('error');});
	  	});
	}
	GetMessages(user_id, friend_id)
	{
	    let body = new FormData();
	    body.append('user_id', user_id);
	    body.append('friend_id', friend_id);
	    let headers = new Headers({ });
	    let options = new Headers({ headers: headers });

		return new Promise(resolve => 
		{

		    this.http
	        .post(this.ApiRootURL + 'get-messages' , body)
		    .map(res => res.json())
		    .subscribe(
		      	response => { resolve(response);},
		      	err => {});
	  	});
	}	
	UserMessagesList(user_id)
	{
	    let body = new FormData();
	    body.append('user_id', user_id);
	    let headers = new Headers({ });
	    let options = new Headers({ headers: headers });

		return new Promise(resolve => 
		{

		    this.http
	        .post(this.ApiRootURL + 'all-user-messages-list' , body)
		    .map(res => res.json())
		    .subscribe(
		      	response => {
	      		this.storage.set('userMessagesList', response);
		      	 resolve(response);
		      	},
		      	err => {});
	  	});
	}



	/* * * * * * * * * * * * * * * * * * * * * 
				Other
	/* * * * * * * * * * * * * * * * * * * * */
	ViewMyProfile(user_id)
	{
		this.showLoading();
	    let body = new FormData();
	    body.append('user_id', user_id);
	    let headers = new Headers({ });
	    let options = new Headers({ headers: headers });

		return new Promise(resolve =>
		{

		    this.http
	        .post(this.ApiRootURL + 'view-my-profile' , body)
		    .map(res => res.json())
		    .subscribe(
		      	response => 
		      	{
		      		this.hideLoading();
		      		resolve(response);
		      	},
		       	err => 
		       	{
	            	this.hideLoading();
            		this.statusCode(err);
	        	});
	  	});
	}
	ViewProfile(user_id, friend_id)
	{
		this.showLoading();
	    let body = new FormData();
	    body.append('user_id', user_id);
	    body.append('friend_id', friend_id);
	    let headers = new Headers({ });
	    let options = new Headers({ headers: headers });

		return new Promise(resolve =>
		{

		    this.http
	        .post(this.ApiRootURL + 'view-profile' , body)
		    .map(res => res.json())
		    .subscribe(
		      	response => 
		      	{
		      		this.hideLoading();
		      		resolve(response);
		      	},
		       	err => 
		       	{
	            	this.hideLoading();
            		this.statusCode(err);
	        	});
	  	});
	}
	/* * * * * * * * * * * * * * * * * * * * * 
			response Message 
	/* * * * * * * * * * * * * * * * * * * * */
	statusCode(response)
	{
		// console.log('STATUS CODE : ' + response.status +', response MESSAGE : '+ response.json().message);
		// console.log(response);
		if (response.status == 200)
		{
	   
			this.toast.create
			({
      			message:  response.message,
      			duration: 5000,
      			position: 'top'
    		}).present();

		}
		if (response.status == 401)
		{
			if (response.json().message)
			{

				this.toast.create
				({
	      			message:  response.json().message,
	      			duration: 5000,
	      			position: 'top'
	    		}).present();

	    	}
		}
		// User Login Fail
		if (response.status == 402)
		{
			if (response.json().message)
			{

				this.toast.create
				({
	      			message:  'Please login',
	      			duration: 5000,
	      			position: 'top'
	    		}).present();
	    		this.logout();

	    	}
		}
		// on validation case
		if (response.status == 404)
		{
			console.log(response);
          	if (response.json().errors.email) 
          	{
          		this.toast.create
				({
	      			message:  response.json().errors.email,
	      			duration: 5000,
	      			position: 'top'
	    		}).present();
          	}
          	if (response.json().errors.password) 
          	{
          		this.toast.create
				({
	      			message:  response.json().errors.password,
	      			duration: 5000,
	      			position: 'top'
	    		}).present();
          	}
          	if (response.json().errors.name) 
          	{
          		this.toast.create
				({
	      			message:  response.json().errors.name,
	      			duration: 5000,
	      			position: 'top'
	    		}).present();
          	}
          	if (response.json().errors.profile_picture) 
          	{
          		this.toast.create
				({
	      			message:  response.json().errors.profile_picture,
	      			duration: 5000,
	      			position: 'top'
	    		}).present();
          	}
		}

	}
}
