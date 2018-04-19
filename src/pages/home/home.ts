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
		message: 'Welcome to Sportify ' + this.fullname + '!' ,
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
		  
		let productCode : String = newProduct.productCode;
		let selectedSize : String = newProduct.selectedSize;
		let sameProduct : boolean = false;
		
		console.log ("New productCode " + productCode);
		console.log ("New selectedSize " + selectedSize);
		 
		if (this.newProducts != null){
			 for (let i=0; i < this.newProducts.length; i++){
				 if (this.newProducts[i].productCode == productCode)
				 {
					console.log("Same Product Code");
					 if (this.newProducts[i].selectedSize == selectedSize)
					 {
						 console.log("Same Product Size");
						//same product with same size, so add quantity
						let previousQuantity : number = this.newProducts[i].selectedQuantity;
						let addedQuantity : number = newProduct.selectedQuantity;
						let newQuantity : number = +previousQuantity + +addedQuantity;
						console.log("Previous Product Quantity " + previousQuantity);
						console.log("Added Product Quantity " + addedQuantity);
						console.log("New Product Quantity " + newQuantity);
						
						//this.newProducts[i].selectedQuantity += newProduct.selectedQuantity;
						 
						//remove the previous product
						let index: number = this.newProducts.indexOf(this.newProducts[i]);
						if (index != -1){
							this.newProducts.splice(index, 1);
						}
						
						newProduct.selectedQuantity = newQuantity;
						//add the updated quantity
						this.newProducts.push(newProduct);
						sameProduct = true;
						break;
					 }
				 }
			 }
		}		
		// if not same product, push new product
			if (sameProduct == false){
				this.newProducts.push(newProduct);
			}
		  
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
          title: 'NOTE',
          subTitle: 'Please select a size and your desired quantity.',
          buttons: ['OK']
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
