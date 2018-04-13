import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { VoucherProvider } from '../../providers/voucher/voucher';
import { Product } from '../../Entities/Product';
import { Voucher } from '../../Entities/Voucher';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  customerId:number;
  products : Product[];
  vouchers : Voucher[];
  newProducts: Product[];

  horImgHeight:number;
  horImgWidth:number;
  row :number;
  fullname : String;
  searchQuery: string = '';
  items: string[];
  images: Array<string>;
  grid: Array<Array<string>>; //array of arrays

  constructor(public navCtrl: NavController , 	public toastCtrl: ToastController, public productProvider: ProductProvider, public voucherProvider: VoucherProvider) {
     this.initializeItems();
     this.horImgHeight = 40;
     this.horImgWidth = 40;
     this.images = new Array();
     this.images.push("Hello");
     this.images.push("Hello2");
     this.images.push("hello3");
     this.images.push("hello4");
     this.grid = Array(Math.ceil(this.images.length/2)); //MATHS!


  }

  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota',
      'Arsenal',
      'Chealsea',
      'Hello'
    ];
  }

 ionViewDidLoad()
 {
  this.fullname = sessionStorage.getItem("userName") ;
  let toast = this.toastCtrl.create(
  {
    message: 'Welcome Back Dear ' + this.fullname ,
    cssClass: 'toast',
    duration: 3000
  });

  toast.present();
  this.customerId = parseInt(sessionStorage.getItem("userId"));
  this.getAllActiveProducts();
  this.getAllVouchers();
	console.log("user Id is: " + this.customerId);
  this.newProducts = [];
  }


  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    /*let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }*/
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

  getAllVouchers(){
	  console.log("Voucher.ts getAllVouchers() called");
	  this.voucherProvider.getAllVouchers(this.customerId).subscribe(
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

  addCartItem(newProduct: Product){
	  console.log(JSON.parse(sessionStorage.getItem("customerCart")));
	  this.newProducts.push(newProduct);
      sessionStorage.setItem("customerCart" , JSON.stringify(this.newProducts));
	  console.log(JSON.parse(sessionStorage.getItem("customerCart")));
  }

  checkInput(item: Product){
	  if (!(typeof item.selectedSize === "undefined" || typeof item.selectedQuantity === "undefined")){
		console.log("Validate(Selected Size Length: " + item.selectedSize.length + " Selected Quantity: " + item.selectedQuantity + ")");

		console.log(item.selectedQuantity>0);
		console.log(item.selectedSize.length>0);
	  }
	  return (!(item.selectedQuantity>0 && item.selectedSize.length>0));
  }
}
