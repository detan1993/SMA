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
	voucherDates : Date[];
	
	userFullName: String;
	userEmail : String;
	userAddress: String;
	
  constructor(public navCtrl: NavController, public navParams: NavParams, public voucherProvider: VoucherProvider) {
  }

  ionViewDidLoad() {
  }
  
  ionViewDidEnter(){
	  this.vouchers = [];
	  
	  this.voucherCodes = [];
	  this.voucherDiscounts = [];
	  this.voucherQuantity = [];
	  this.voucherDates = [];
	  
	  this.voucherCounts = [];
	  
	  this.getAllVouchers();
	  
	  this.userFullName = sessionStorage.getItem("userName");
	  this.userEmail = sessionStorage.getItem("userEmail");
	  this.userAddress = sessionStorage.getItem("userAddress");
  }
  
  getAllVouchers(){
	  console.log("profile.ts getAllVouchers() called: " + parseInt(sessionStorage.getItem("userId")));
	  this.voucherProvider.getAllVouchers(parseInt(sessionStorage.getItem("userId"))).subscribe(
		 response =>{
			console.log("Response received");
			this.vouchers = response.voucherList
			console.log(this.vouchers);
			for(let voucher of this.vouchers){
				console.log("Current this.vouchers: " + voucher);
				if(this.voucherCodes.indexOf(voucher.voucherCode) >-1){
					console.log("this.voucherCodes contains: " + voucher.voucherCode);
					let i = this.voucherCodes.indexOf(voucher.voucherCode);
					this.voucherQuantity[i] +=1;
				}else{
					console.log("this.voucherCodes does not contain: " + voucher.voucherCode);
					this.voucherCodes.push(voucher.voucherCode);
					this.voucherDiscounts.push(voucher.voucherValue);
					this.voucherQuantity.push(1);
					this.voucherDates.push(voucher.dateExpired);
				}
			}

			console.log("After first for loop: " + this.voucherCodes.length + " " + this.voucherDiscounts.length + " " +this.voucherQuantity.length);
			this.voucherCounts = [];
			for(let i in this.voucherCodes){
				let newCount = new VoucherCount();
				newCount.voucherCode = this.voucherCodes[i];
				newCount.voucherDiscount = this.voucherDiscounts[i];
				newCount.voucherCount = this.voucherQuantity[i];
				newCount.voucherDate = this.voucherDates[i];
				this.voucherCounts.push(newCount);
			}
		  },
		  error => {
			  console.log("HTTP " + error.status + ": " + error.error.message);
		  }
	  );
	  

	}
	
}
