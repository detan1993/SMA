import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { Product } from '../../Entities/Product';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  products : Product[];
  horImgHeight:number;
  horImgWidth:number;
  row :number;
  fullname : String;
  searchQuery: string = '';
  items: string[];
  images: Array<string>;
  grid: Array<Array<string>>; //array of arrays

  constructor(public navCtrl: NavController , 	public toastCtrl: ToastController, public productProvider: ProductProvider ) {
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
  this.getAllActiveProducts();

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

}
