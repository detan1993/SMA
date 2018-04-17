import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AccountProvider } from '../../providers/account/account';
import { Customer } from '../../Entities/Customer';
import { emailValidator, matchingPasswords } from '../../validators/validators';
import { LoginPage } from '../login/login';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
	
	authForm: FormGroup;
	
	firstName : AbstractControl;
	lastName : AbstractControl;
	phoneNum : AbstractControl;
	gender : AbstractControl;
	address : AbstractControl;
	zipCode : AbstractControl;
	dateOfBirth : AbstractControl;
	email : AbstractControl;
	password : AbstractControl;
	confirmPassword : AbstractControl;
	loyaltyPoints : AbstractControl;
	dateRegistered : AbstractControl;
	
	customer : Customer;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public alertCtrl: AlertController, 
  public loadingCtrl: LoadingController,
  public accountProvider: AccountProvider, public formBuilder: FormBuilder) {
	  
	   this.navCtrl = navCtrl;
	   this.authForm = formBuilder.group({
            firstName: ['', Validators.compose([Validators.required])],
            lastName: ['', Validators.compose([Validators.required])],
			phoneNum: ['', Validators.compose([Validators.required])],
			gender: ['', Validators.compose([Validators.required])],
			address: ['', Validators.compose([Validators.required])],
			zipCode: ['', Validators.compose([Validators.required])],
			dateOfBirth: ['', Validators.compose([Validators.required])],
			email: ['', Validators.compose([Validators.required, emailValidator])],
			password: ['', Validators.compose([Validators.required])],
			confirmPassword: ['', Validators.compose([Validators.required])]
        },	{validator: matchingPasswords('password', 'confirmPassword')});	  
  }
  
  
   onSubmit(value: any): void {
		
        if(this.authForm.valid) {
			let loading = this.loadingCtrl.create({
    content: 'Verifying.....'
  });
			this.customer = new Customer();
				console.log(value.firstName);
				console.log(value.lastName);
				console.log(value.phoneNum);
				console.log(value.gender);
				console.log(value.address);
				console.log(value.zipCode);
				console.log(value.dateOfBirth);
				console.log(value.email);
				console.log(value.password);
				
			this.customer.firstName = value.firstName;
			this.customer.lastName = value.lastName;
			this.customer.phoneNum = value.phoneNum;
			this.customer.gender = value.gender;
			this.customer.address = value.address;
			this.customer.zipCode = value.zipCode;
			this.customer.dateOfBirth = value.dateOfBirth;
			this.customer.email = value.email;
			this.customer.password = value.password;
			this.customer.loyaltyPoints = 0;
			this.customer.dateRegistered = new Date();
			
			this.accountProvider.createNewCustomer(this.customer).subscribe(
		  response =>{
			  console.log("Response received");
			  loading.dismiss();
			   let alert = this.alertCtrl.create({
          title: 'Success!',
          subTitle: 'Login now to start shopping with Sportify!',
           buttons: [
			{
				text: 'OK',
				handler: () => {
				  console.log('OK clicked');
				  this.navCtrl.push(LoginPage);
			}
			}
    ]
        });
		 alert.present();
			  
		  },
		  error => {
			  loading.dismiss();
			  console.log("HTTP " + error.status + ": " + error.error.message);
		  }
	  );
			
          
        }
    }   

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  
  signUp (){
	   console.log("signUp() called");
  }
  
  
 }
