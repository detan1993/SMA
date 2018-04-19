import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Voucher } from '../../Entities/Voucher';
import { VoucherProvider } from '../../providers/voucher/voucher';
import { VoucherCount } from '../../Entities/VoucherCount';
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
	voucherCounts: VoucherCount[];
	
	voucherCodes: String[];
	voucherDiscounts: number[];
	voucherQuantity : number[];
	
  constructor(public navCtrl: NavController, public navParams: NavParams, public voucherProvider: VoucherProvider) {
  }

  ionViewDidLoad() {
	  this.vouchers = [];
    console.log('ionViewDidLoad ProfilePage');
  }
  
  ionViewDidEnter(){
	  console.log("ionViewDidEnter()");
	  this.getAllVouchers();
	  this.voucherCodes = [];
	  this.voucherDiscounts = [];
	  this.voucherQuantity = [];
	  this.voucherCounts = [];
	  
	  this.prepareVoucherQuantity();
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
	  
	  prepareVoucherQuantity(){
		  for(let voucher of this.vouchers){
			  if(this.voucherCodes.includes(voucher.voucherCode)){
				let i = voucherCodes.indexOf(voucher.voucherCode);
				this.voucherCounts[i]++;
			  }else{
				  this.voucherCodes.push(voucher.voucherCode);
				  this.voucherDiscounts.push(voucher.voucherValue);
				  this.voucherCounts.push(1);
			  }
		  }
		  
		  this.voucherCounts = [];
		  for(let i in this.voucherCodes){
			  let newCount = new VoucherCount();
			  newCount.voucherCode = this.voucherCodes[i];
			  newCount.voucherDiscount = this.voucherDiscounts[i];
			  newCount.voucherQuantity = this.voucherQuantity[i];
			  this.voucherCounts.push(newCount);
		  }
	  }
  }

}
