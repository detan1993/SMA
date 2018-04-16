import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { AccountProvider } from '../../providers/account/account';
import { SignupPage } from '../signup/signup';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username :String;
  password : String;
//  isLogin: boolean;
  //loginErrorMessage: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
  public accountProvider: AccountProvider, public modalCtrl: ModalController) {
    this.username = "";
    this.password = "";
  //  this.isLogin = false;
      // this.email = "Daviddetan93@gmail.com";
  }
  
  openSignUpPage(){
	  console.log('redirecting to signup page');
	/*  let signUpModal = this.modalCtrl.create(SignUpPage);
		signUpModal.present();*/
		this.navCtrl.push(SignupPage);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
/*  if(sessionStorage.getItem("userIsLogin") === "true")
    {
            this.isLogin = true;
    }*/

  }

  login() {

   if(this.password == null)
   {
     let alert = this.alertCtrl.create({
      title: 'ERROR',
      subTitle: 'Username and Password Cannot be Empty!',
      buttons: ['Try Again']
    });
    alert.present();


   }else{
     console.log("Password not empty");
     console.log("Retrieveing credential");
     this.accountProvider.userLogin(this.username, this.password).subscribe(
  			response => {
  			  // this.infoMessage = "Account is " + response.id + " created successfully";
  				// // this.errorMessage = null;
        //  alert(response.email);
         console.log("SUCCESS with response " + response.fullname);
         sessionStorage.setItem("userIsLogin", "true");
         sessionStorage.setItem("userName", response.fullname);
		 sessionStorage.setItem("userId", response.id);
         window.location.reload();
  			},
  			error => {
  				// this.infoMessage = null;
         console.log("HTTP " + error.status + ": " ); //error.error.message
         let alert = this.alertCtrl.create({
          title: 'ERROR',
          subTitle: 'You Have Entered Invalid Username or Password!',
          buttons: ['Try Again']
        });
        alert.present();
  				// this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
  			}
  		);


  //   this.navCtrl.push(HomePage);
   }
 }




}
