import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-message-image-view',
  templateUrl: 'message-image-view.html',
})
export class MessageImageViewPage
{
	image : any;
	constructor(public navParams: NavParams, public view: ViewController)
	{
		this.image = this.navParams.get('image');

	}

 	dismiss(){
  		this.view.dismiss();
  	}
}
