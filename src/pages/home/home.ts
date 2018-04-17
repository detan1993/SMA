import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { AlertController } from 'ionic-angular';
import { Product } from '../../Entities/Product';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  customerId:number;
  products : Product[];
  newProducts: Product[];

  fullname : String;

  constructor(public navCtrl: NavController , public alertCtrl: AlertController,public toastCtrl: ToastController, public productProvider: ProductProvider) {
  }

 ionViewDidLoad()
 {
	  this.fullname = sessionStorage.getItem("userName");
	  let justPurchased = sessionStorage.getItem("hasJustPurchased");
	  let toast = this.toastCtrl.create(
	  {
		message: 'Welcome Back Dear ' + this.fullname ,
		cssClass: 'toast',
		duration: 3000
	  });
	  
	  if(justPurchased == "true"){
		  toast = this.toastCtrl.create({
			  message: 'Your order is successful',
			  cssClass: 'toast',
			  duration:3000
		  });
		  sessionStorage.setItem("hasJustPurchased",null);
	  }

	  toast.present();
	  this.customerId = parseInt(sessionStorage.getItem("userId"));
	  this.getAllActiveProducts();
		console.log("user Id is: " + this.customerId);
	  this.newProducts = [];
  }

  ionViewDidEnter(){
	  this.newProducts = JSON.parse(sessionStorage.getItem("customerCart"));
	  if(!this.newProducts){
		console.log("new Products is false");
		this.newProducts = [];	
	  }
  }

  getAllActiveProducts(){
	  console.log("Home.ts getAllActiveProducts() called");
	  this.productProvider.getAllActiveProducts().subscribe(
		  response =>{
			  console.log("Response received");
			  this.products = response.productList
			  console.log(this.products);
		  },
		  error => {
			  console.log("HTTP " + error.status + ": " + error.error.message);
		  }
	  );
  }

  addCartItem(newProduct: Product){
	  if(this.checkInput(newProduct)){
		  this.newProducts.push(newProduct);
		  sessionStorage.setItem("customerCart" , JSON.stringify(this.newProducts));
		  console.log(JSON.parse(sessionStorage.getItem("customerCart")));
		  
		  let toast = this.toastCtrl.create(
		  {
			message: 'Added ' + newProduct.productName + ' to cart',
			cssClass: 'toast',
			duration: 1500
		  });

		  toast.present();
	  }else{
		let alert = this.alertCtrl.create({
          title: 'ERROR',
          subTitle: 'Please choose a valid size and quantity.',
          buttons: ['Ok']
        });
        alert.present();
	  }
  }

  checkInput(newProduct: Product): boolean{
	  let size = newProduct.selectedSize;
	  let quantity = newProduct.selectedQuantity;
	  console.log("Check input: " + size + " " + quantity);
	  
	  if(typeof size ==="undefined" || size.length<=0 || typeof quantity ==="undefined" || quantity <=0){
		  return false;
	  }
	  
	  return true;
  }
}
