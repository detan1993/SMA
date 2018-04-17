import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Product } from '../../Entities/Product';
import { ProductPurchase } from '../../Entities/ProductPurchase';
import { OrderProvider } from '../../providers/order/order';
import { Order } from '../../Entities/Order';
import { Voucher } from '../../Entities/Voucher';
import { VoucherProvider } from '../../providers/voucher/voucher';
import { AlertController } from 'ionic-angular';
import { DecimalPipe } from '@angular/common';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
	customerCart : Product[];
	subtotal:number;
	discountFromVoucher:number;
	total:number;
	voucherCode:String;
	order: Order;
	
	vouchers : Voucher[];
	appliedVoucher: Voucher;

  constructor(public navCtrl: NavController ,public decimalPipe: DecimalPipe, public alertCtrl: AlertController,public toastCtrl: ToastController, public navParams: NavParams, public orderProvider: OrderProvider, public voucherProvider : VoucherProvider) {
  }

  ionViewDidLoad() {
  }
  
  ionViewDidEnter(){
		console.log("cart enter");
		this.subtotal = 0;
		this.discountFromVoucher = 0;
		this.total =0;
		this.voucherCode = "";
		this.customerCart = [];
		this.order = new Order();
		this.getAllVouchers();

		this.convertSessionCartToProductArray();
		console.log("CustomerCart on pageEnter: " + this.customerCart);
	  
  }
  
  convertSessionCartToProductArray(){
		this.customerCart = JSON.parse(sessionStorage.getItem("customerCart"));
		console.log(this.customerCart);

		if(this.customerCart != null){
		  for(let i=0; i<this.customerCart.length; i++){
			this.subtotal += (this.customerCart[i].price * this.customerCart[i].selectedQuantity);
		  }
		}
		
		this.calculateTotal();
  }
  
  getAllVouchers(){
	  console.log("cart.ts getAllVouchers() called: " + parseInt(sessionStorage.getItem("userId")));
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
  
  applyVoucher(){
	  console.log("Apply voucher: " + this.voucherCode);
		let hasVoucher = false;
		for(let v of this.vouchers){
			console.log("Voucher: " + v.voucherCode);
			if(v.voucherCode == this.voucherCode){
				hasVoucher = true;
				this.appliedVoucher = v;
				break;
			}
		}

		if(!hasVoucher){
			let alert = this.alertCtrl.create({
				title: 'ERROR',
				subTitle: 'Invalid Voucher Code.',
				buttons: ['Ok']
			});
			
			this.voucherCode = "";
			this.calculateTotal();
			alert.present();
		}else{
			let toast = this.toastCtrl.create(
			{
				message: 'Voucher Code' + this.voucherCode + ' has been applied',
				cssClass: 'toast',
				duration: 2000
			});

			toast.present();
			
			this.calculateTotal();
		}
  }
  
  removeFromCart(i: number, removedProduct: Product){
		this.customerCart = JSON.parse(sessionStorage.getItem("customerCart"));
		this.subtotal -= (this.customerCart[i].price * this.customerCart[i].selectedQuantity);
		  
		this.customerCart.splice(i,1);
		sessionStorage.setItem("customerCart" , JSON.stringify(this.customerCart));

		let toast = this.toastCtrl.create(
		{
		message: 'Removed ' + removedProduct.productName + ' from cart',
		cssClass: 'toast',
		duration: 1500
		});

		toast.present();

		console.log("remove: this.customerCart.length: " + this.customerCart.length);
		if(this.customerCart.length<=0){
		  this.customerCart = null;
		  sessionStorage.setItem("customerCart", null);
		  console.log("remove: empty cart: " + this.customerCart);
		}

		this.calculateTotal();
  }
  
  makeOrder(){
	  console.log("Make order called()");
	  let productPurchases = [];
	  
	  this.order.customerId =  parseInt(sessionStorage.getItem("userId"));
	  
	  
	  this.order.voucherId = -1; 
	  if(typeof this.appliedVoucher !=="undefined"){
		  this.order.voucherId = this.appliedVoucher.id;
	  }
	  this.order.totalAmount = this.total;
	  this.order.datePaid = new Date();
	  this.order.sizePurchases = [];
	  
	  for(let i=0; i<this.customerCart.length;i++){
		  let newProductPurchase = new ProductPurchase();
		  newProductPurchase.pricePurchase = this.customerCart[i].price;
		  newProductPurchase.qtyPurchase = this.customerCart[i].selectedQuantity;
		  newProductPurchase.sizePurchase = this.customerCart[i].selectedSize;
		  this.order.sizePurchases.push(newProductPurchase.sizePurchase);
		  
		  let newProductPurchaseProduct = new Product();
		  newProductPurchaseProduct.id = this.customerCart[i].id;
		  newProductPurchase.productPurchase = newProductPurchaseProduct;
		  
		  productPurchases.push(newProductPurchase);
	  }
	  
	  this.order.productPurchases = productPurchases;
	  
	  console.log("this.orderProvider.makeOrder(this.order).subscribe(...) called");
		this.orderProvider.makeOrder(this.order).subscribe(
		  response =>{
			  console.log("Response received and status");
			  sessionStorage.setItem("hasJustPurchased","true");
			  sessionStorage.setItem("customerCart",null);
			  this.appliedVoucher = null;
			  window.location.reload();
		  },
		  error => {
			  console.log("HTTP " + error.status + ": " + error.error.message);
		  }
	  );
  }

  minusButtonClick(i:number,editProduct: Product){
		console.log("Minus clicked for product: " +i + " " +  editProduct.productName + " : " + editProduct.price);
	  
		this.customerCart = JSON.parse(sessionStorage.getItem("customerCart"));

		console.log("Before: " + this.subtotal);
		if(this.customerCart[i].selectedQuantity >0){
		  this.customerCart[i].selectedQuantity --;
		  this.subtotal -= this.customerCart[i].price;
		}
		
		console.log("After: " + this.customerCart[i].price + " " + this.subtotal);

		this.calculateTotal();
		sessionStorage.setItem("customerCart" , JSON.stringify(this.customerCart));
  }
  
  plusButtonClick(i:number,editProduct: Product){
		console.log("Plus clicked for product: " +i + " " + editProduct.productName + " : " + editProduct.price);
	  
		this.customerCart = JSON.parse(sessionStorage.getItem("customerCart"));
		this.customerCart[i].selectedQuantity ++;
		this.subtotal += this.customerCart[i].price;
	  
		this.calculateTotal();
		sessionStorage.setItem("customerCart" , JSON.stringify(this.customerCart));
  }
  
  calculateTotal(){
	  this.subtotal =parseFloat(this.decimalPipe.transform(this.subtotal, '1.2-2').replace(',',''));
	  console.log("calculate voucher Code: " + this.voucherCode + " " + this.voucherCode.length);
	  if(typeof this.voucherCode ==="undefined" || this.voucherCode.length <=0){
		  this.total = this.subtotal;
		  this.discountFromVoucher = 0;
	  }else{
		  this.discountFromVoucher = this.subtotal * (this.appliedVoucher.voucherValue/100);
		  this.discountFromVoucher = parseFloat(this.decimalPipe.transform(this.discountFromVoucher, '1.2-2').replace(',',''));
		  this.total = this.subtotal - this.discountFromVoucher;
	  }
	  
	  this.total = parseFloat(this.decimalPipe.transform(this.total, '1.2-2').replace(',',''));
	  
  }
}
