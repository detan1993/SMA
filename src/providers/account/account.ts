import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Platform } from 'ionic-angular';
import {Customer} from '../../Entities/Customer';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/*
  Generated class for the AccountProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AccountProvider {

ipAddress = '192.168.1.8';
portNo = '3446';
fullBaseUrl = 'http://' + this.ipAddress + ':' + this.portNo + '/Sportify-war/Resources/Account';


baseUrl = "/api/Account";  // the system will replace the api with the proxy URL that we speicfy in ionic.config.json

//Account/login/Daviddetan93@gmail.com/12345678

  constructor(public platform: Platform, public httpClient: HttpClient) {
    console.log('Hello AccountProvider Provider');
  }

userLogin(username: String , password: String): Observable<any>
{

 console.log("*************INSIDE USER LOGIN");

  let path: string = '';

  if(this.platform.is('core') || this.platform.is('mobileweb'))
  {
    path = this.baseUrl;
  }
  else
  {
    path = this.fullBaseUrl;
  }
   console.log("*********** MY PATH IS " + path + "/login/" + username + "/" + password);
  return this.httpClient.get<any>(path + "/login/" + username + "/" + password).pipe
  (
    catchError(this.handleError)
  );
}

createNewCustomer(customer: Customer): Observable<any>{
	console.log("Customer.createNewCustomer() Provider called!");
	
	let path: string = '';
	  if(this.platform.is('core') || this.platform.is('mobileweb'))
	  {
		path = this.baseUrl;
	  }
	  else
	  {
		path = this.fullBaseUrl;
	  }
	   console.log("*********** MY PATH IS " + path);
	   
	  return this.httpClient.post(path + "/addNewCustomer", customer, 
			{
			  headers:
			  {
				'content':"application/json",
			  }
			}).pipe
			(
			catchError(this.handleError)
		  );
}

private handleError(error: HttpErrorResponse)
{
  if (error.error instanceof ErrorEvent)
  {
    console.error('An unknown error has occurred:', error.error.message);
  }
  else
  {
    console.error(" A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error.message}`);
  }

  return new ErrorObservable(error);
}

}
