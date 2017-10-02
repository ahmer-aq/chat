import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AppDataServiceProvider } from '../../providers/app-data-service/app-data-service';

/**
 * Generated class for the LogoutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public DataService: AppDataServiceProvider) {
  	this.DataService.logout();
  }

  

}
