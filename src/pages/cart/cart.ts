import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    //getting carts that customer added to session storage
    console.log('ionViewDidLoad CartPage');

    let customerCart = JSON.parse(sessionStorage.getItem("customerCart"));
    console.log("Customer Cart Size is " + customerCart.length );

    if(customerCart.length > 0){
      //Populate the data to the attributes here.
      //Some one ionViewDidLoad, only launch one. Next time when you caome back to this page, it wont run this ionViewDidLoad again.
      //Please help me verify this Shan thanks. :)
      for(let i=0; i<customerCart.length; i++){
        console.log( "Product Id" +  customerCart[i]["id"] +  ", Quantity: " + customerCart[i]["selectedQuantity"] +  ", Product Name " +  customerCart[i]["productName"] ) ;
       }

    }


  }

}
