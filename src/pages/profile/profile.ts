import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Voucher } from '../../Entities/Voucher';
import { VoucherProvider } from '../../providers/voucher/voucher';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

	vouchers : Voucher[];
	
  constructor(public navCtrl: NavController, public navParams: NavParams, public voucherProvider: VoucherProvider) {
  }

  ionViewDidLoad() {
	  this.vouchers = [];
    console.log('ionViewDidLoad ProfilePage');
  }
  
  ionViewDidEnter(){
	  console.log("ionViewDidEnter()");
	  this.getAllVouchers();
  }
  
    getAllVouchers(){
	  console.log("profile.ts getAllVouchers() called: " + parseInt(sessionStorage.getItem("userId")));
	  this.voucherProvider.getAllVouchers(parseInt(sessionStorage.getItem("userId"))).subscribe(
		 response =>{
			  console.log("Response received");
			  this.vouchers = response.voucherList
			  console.log(this.vouchers);
		  },
		  error => {
			  console.log("HTTP " + error.status + ": " + error.error.message);
		  }
	  );
  }

}
