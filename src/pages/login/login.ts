import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { AccountProvider } from '../../providers/account/account';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
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

 /*  username :String;
  password : String; */
  loginForm : FormGroup;
  username: AbstractControl;
  password: AbstractControl;
  
//  isLogin: boolean;
  //loginErrorMessage: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
  public accountProvider: AccountProvider, public modalCtrl: ModalController, public formBuilder: FormBuilder) {
  /*   this.username = "";
    this.password = ""; */
	
	this.navCtrl = navCtrl;
	 this.loginForm = formBuilder.group({
		 username: ['', Validators.compose([Validators.required])],
		password: ['', Validators.compose([Validators.required])]
	 });
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
  
   onSubmit(value: any): void {
	   
	    this.accountProvider.userLogin(value.username, value.password).subscribe(
  			response => {
  			  // this.infoMessage = "Account is " + response.id + " created successfully";
  				// // this.errorMessage = null;
        //  alert(response.email);
         console.log("SUCCESS with response " + response.fullname);
         sessionStorage.setItem("userIsLogin", "true");
         sessionStorage.setItem("userName", response.fullname);
		 sessionStorage.setItem("userId", response.id);
		 sessionStorage.setItem("userEmail", response.email);
		 sessionStorage.setItem("userAddress", response.address);
         window.location.reload();
  			},
  			error => {
  				// this.infoMessage = null;
         console.log("HTTP " + error.status + ": " ); //error.error.message
         let alert = this.alertCtrl.create({
          title: 'ERROR',
          subTitle: 'Invalid Username or Password!',
          buttons: ['Try Again']
        });
        alert.present();
  				// this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
  			}
  		);
	   
   }
}
