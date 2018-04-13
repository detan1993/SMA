import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Product } from '../../Entities/Product';
import { ProductPurchase } from '../../Entities/ProductPurchase';
import { OrderProvider } from '../../providers/order/order';
import { Order } from '../../Entities/Order';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public orderProvider: OrderProvider) {
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
	  
	  this.convertSessionCartToProductArray();
  }
  
  convertSessionCartToProductArray(){
	  this.customerCart = JSON.parse(sessionStorage.getItem("customerCart"));
	  console.log(this.customerCart);
	  
	  if(this.customerCart != null){
		  for(let i=0; i<this.customerCart.length; i++){
			this.subtotal += this.customerCart[i].price;
			this.total += this.customerCart[i].price;
		  }
	  }
  }
  
  applyVoucher(){
	  
  }
  
  makeOrder(){
	  console.log("Make order called()");
	  let productPurchases = [];
	  
	  this.order.customerId =  parseInt(sessionStorage.getItem("userId"));
	  this.order.voucherCode = this.voucherCode;
	  this.order.totalAmount = this.total;
	  this.order.datePaid = new Date();
	  
	  for(let i=0; i<this.customerCart.length;i++){
		  let newProductPurchase = new ProductPurchase();
		  newProductPurchase.price = this.customerCart[i].price;
		  newProductPurchase.quantity = this.customerCart[i].selectedQuantity;
		  
		  let newProductPurchaseProduct = new Product();
		  newProductPurchaseProduct.id = this.customerCart[i].id;
		  newProductPurchase.productPurchase = newProductPurchaseProduct;
		  
		  productPurchases.push(newProductPurchase);
	  }
	  
	  this.order.productPurchases = productPurchases;
	  
	  
		this.orderProvider.makeOrder(this.order).subscribe(
		  response =>{
			  console.log("Response received");
		  },
		  error => {
			  console.log("HTTP " + error.status + ": " + error.error.message);
		  }
	  );
  }

}
