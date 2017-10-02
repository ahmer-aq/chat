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
	GetAllUserPublicStoriesForMap(user_id)
	{
    	this.showLoading();
	    let body = new FormData();
	    body.append('user_id', user_id);
	    let headers = new Headers({});
	    let options = new Headers({ headers: headers });

		return new Promise(
			resolve => 
			{
			    this.http
		        .post(this.ApiRootURL + 'get-all-user-public-stories' , body)
			    .map(res => res.json())
			    .subscribe(
			      	response => 
			      	{

						this.hideLoading();
	            		this.statusCode({status:200, message:response.message});
		      			this.storage.set('places', response);
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
	//FRIEND SECTION
	// ADD : send-friend-request/{user_id}

	sendFriendRequest(user_id, friend_id) // sendFriendRequest
	{
		this.showLoading();
	    let body = new FormData();
	    body.append('user_id', user_id);
	    body.append('friend_id', friend_id);
	    let headers = new Headers({});
	    let options = new Headers({ headers: headers });

		return new Promise(resolve => {
		    this.http.post(this.ApiRootURL + 'send-friend-request' , body)
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

	// VIEW
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

	deleteFriendRequest(user_id, friend_id)
	{
	    this.showLoading();
		this.http.get(this.ApiRootURL + 'delete-friend-request/'+ user_id +'/delete/'+ friend_id)
	      .map(res => res.json())
	      .subscribe(response => 
			{
				this.hideLoading();
				this.statusCode({status:200, message:response.message});
				this.app.getRootNav().setRoot(HomePage);
				
			}, err => 
	      	{
		
		      	this.hideLoading();
		        this.statusCode(err);
            });
	}	

	// REQUEST
	showFriendsRequest(user_id)
	{
		this.showLoading();
		return new Promise(resolve => {
		    this.http.get(this.ApiRootURL + 'show-friends-request/' + user_id )
		      .map(res => res.json())
		      .subscribe(
		      	response =>
		      	{
		      		this.hideLoading();
					this.statusCode({status:200, message:response.message});
		      		this.storage.set('friendRequestList', response);
		      		resolve(response);
		      	},
		       	err =>
		       	{
		      		this.hideLoading();
	            	this.statusCode(err);
	        	});
	  	});
	}

	acceptFriendRequest(user_id, friend_id)
	{
		this.showLoading();
		this.http.get(this.ApiRootURL + 'accept-friend-request/' + user_id + '/accept/' + friend_id)
	      .map(res => res.json())
	      .subscribe(
	      	response => 
	      	{
	      		this.hideLoading();
				this.statusCode({status:200, message:response.message});
    			this.app.getRootNav().setRoot(HomePage);
	      	},
            err => 
            {
				this.hideLoading();
	            this.statusCode(err);
            });
	}
	rejectFriendRequest(user_id, friend_id)
	{
		this.showLoading();
		this.http.get(this.ApiRootURL + 'reject-friend-request/' + user_id + '/reject/' + friend_id)
	      .map(res => res.json())
	      .subscribe(
	      	response => 
	      	{
	      		this.hideLoading();
				this.statusCode({status:200, message:response.message});
	        	this.app.getRootNav().setRoot(HomePage);
	      	},
            err => 
            {
				this.hideLoading();
	            this.statusCode(err);
            });
	}
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

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
	GetMapModelUserData(user_id, locationOwnerId, locationId)
	{
		this.showLoading();
	    let body = new FormData();
	    body.append('user_id', user_id);
	    body.append('locationOwnerId', locationOwnerId);
	    body.append('locationId', locationId);
	    let headers = new Headers({});
	    let options = new Headers({ headers: headers });

		return new Promise(resolve => {
		    this.http.post(this.ApiRootURL + 'get-map-model-user-data' , body)
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
				User Story & Timeline
	/* * * * * * * * * * * * * * * * * * * * */
	GetUserStories(user_id)
	{
		this.showLoading();
	    let body = new FormData();
	    body.append('user_id', user_id);
	    let headers = new Headers({ });
	    let options = new Headers({ headers: headers });
 		return new Promise(resolve => {
	    this.http.post(this.ApiRootURL + 'get-user-story', body)
	      .map(res => res.json())
	      .subscribe(
	      	response => {
	      		this.hideLoading();
				this.statusCode({status:200, message:response.message});
	      		this.storage.set('mystory', response);
	      		resolve(response);
	      },
	       err => {
	      		this.hideLoading();
            	this.statusCode(err);
        	});
        });
	}


	AddUserStory( user_id, image, title, description, latitude, longitude, status)
	{
		this.showLoading();
	    let body = new FormData();
	    body.append('user_id', user_id);
	    body.append('image', image);
	    body.append('title', title);
	    body.append('description', description);
	    body.append('latitude', latitude);
	    body.append('longitude', longitude);
	    body.append('status', status);
	    let headers = new Headers({ });
	    let options = new Headers({ headers: headers });
 		return new Promise(resolve => {
	    this.http.post(this.ApiRootURL + 'add-user-story', body)
	      .map(res => res.json())
	      .subscribe(
	      	response => 
	      	{
		      	this.hideLoading();
				this.statusCode({status:200, message:response.message});
		      	this.storage.set('mystory', response);
			    this.app.getRootNav().setRoot(HomePage);
		      	resolve(response);
	      	},
	       err => {
            	this.hideLoading();
            	this.statusCode(err);
        	});
        });
	}

	UserTimeline(user_id)
	{
		this.showLoading();
	    let body = new FormData();
	    body.append('user_id', user_id);
	    let headers = new Headers({ });
	    let options = new Headers({ headers: headers });
 		return new Promise(resolve => {
	    this.http.post(this.ApiRootURL + 'get-user-timeline', body)
	      .map(res => res.json())
	      .subscribe(
	      	response => {
	      		this.hideLoading();
				this.statusCode({status:200, message:response.message});
	      		this.storage.set('mystory', response);
	      		resolve(response);
	      },
	       err => {
	      		this.hideLoading();
            	this.statusCode(err);
        	});
        });
	}
	/* * * * * * * * * * * * * * * * * * * * * 
					Overlay 
	/* * * * * * * * * * * * * * * * * * * * */
	GetOverlay(user_id)
	{
	    let body = new FormData();
	    body.append('user_id', user_id);
	    let headers = new Headers({ });
	    let options = new Headers({ headers: headers });

		return new Promise(resolve => 
		{

		    this.http
	        .post(this.ApiRootURL + 'get-overlay-image' , body)
		    .map(res => res.json())
		    .subscribe(
		      	response => 
		      	{
					this.statusCode({status:200, message:response.message});
		      		resolve(response);
		      	},
		       err => 
		       {
            		this.statusCode(err);
	        	});
	  	});
	}

	UploadOverlay(overlayImage, user_id)
	{
		this.showLoading();
	    let body = new FormData();
	    body.append('overlay_image', overlayImage);
	    body.append('user_id', user_id);
	    let headers = new Headers({ });
	    let options = new Headers({ headers: headers });
 		return new Promise(resolve => {
		    
	    this.http
	        .post(this.ApiRootURL + 'upload-overlay-image', body)
	        .map(res => res.json())
	        .subscribe(
	            response => 
	            {
	            	this.hideLoading();
					this.statusCode({status:200, message:"Overlay Successfully Uploaded"});
		      		resolve(response);
	            },
	            err => {
	            	this.hideLoading();
            		this.statusCode(err);
	            }
	        );
	  	});
	}
	/* * * * * * * * * * * * * * * * * * * * * 
					Location 
	/* * * * * * * * * * * * * * * * * * * * */
	GetLocation(user_id)
	{
		this.showLoading();
	    let body = new FormData();
	    body.append('user_id', user_id);
	    let headers = new Headers({ });
	    let options = new Headers({ headers: headers });

		return new Promise(resolve => {

		    this.http
	        .post(this.ApiRootURL + 'get-location' , body)
		    .map(res => res.json())
		    .subscribe(
		      	response => 
		      	{
		      		this.hideLoading();
					this.statusCode({status:200, message:response.message});
		      		this.storage.set('getUserLocation', response);
		      		resolve(response);
		      	},
		       err => 
		       {
	            	this.hideLoading();
            		this.statusCode(err);
	        	});
	  	});
	}

	DeleteLocation(user_id)
	{
		this.showLoading();
	    let body = new FormData();
	    body.append('user_id', user_id);
	    let headers = new Headers({ });
	    let options = new Headers({ headers: headers });

		return new Promise(resolve => {

		    this.http
	        .post(this.ApiRootURL + 'delete-location' , body)
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

	AddLocation( user_id,google_address,street_address,city,state,postalCode,country,image,title,description,latitude,longitude)
	{
		this.showLoading();
	    let body = new FormData();
	    body.append('user_id', user_id);
	    body.append('google_address', google_address);
	    body.append('street_address', street_address);
	    body.append('city', city);
	    body.append('state', state);
	    body.append('postalCode', postalCode);
	    body.append('country', country);
	    body.append('image', image);
	    body.append('title', title);
	    body.append('description', description);
	    body.append('latitude', latitude);
	    body.append('longitude', longitude);
	    let headers = new Headers({ });
	    let options = new Headers({ headers: headers });

		return new Promise(resolve => {

		    this.http
	        .post(this.ApiRootURL + 'add-location' , body)
		    .map(res => res.json())
		    .subscribe(
		      	response => 
		      	{
		      		this.hideLoading();
					this.statusCode({status:200, message:"Location is succesfully added"});
	    			this.app.getRootNav().setRoot(HomePage);
		      		resolve(response);
		      },
		       	err => 
		       	{
	            	this.hideLoading();
            		this.statusCode(err);
	        	});
	  	});
	}

	AddUserImageLocation( user_id,image,latitude,longitude)
	{
		this.showLoading();
	    let body = new FormData();
	    body.append('user_id', user_id);
	    body.append('image', image);
	    body.append('latitude', latitude);
	    body.append('longitude', longitude);
	    let headers = new Headers({ });
	    let options = new Headers({ headers: headers });

		return new Promise(resolve => {

		    this.http
	        .post(this.ApiRootURL + 'add-user-image-location' , body)
		    .map(res => res.json())
		    .subscribe(
		      	response => 
		      	{
		      		this.hideLoading();
					this.statusCode({status:200, message:"Location is succesfully added on Map"});
	    			this.app.getRootNav().setRoot(HomePage);
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
	OnboardingStatusChange(user_id)
	{
		this.showLoading();
	    let body = new FormData();
	    body.append('user_id', user_id);
	    body.append('onboarding', '1');
	    let headers = new Headers({ });
	    let options = new Headers({ headers: headers });

		return new Promise(resolve =>
		{

		    this.http
	        .post(this.ApiRootURL + 'onboarding-status-change' , body)
		    .map(res => res.json())
		    .subscribe(
		      	response => 
		      	{
		      		this.hideLoading();
					this.storage.set('user', response);
					this.statusCode({status:200, message:"Welcome to Markr"});
	    			this.app.getRootNav().setRoot(HomePage);
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
