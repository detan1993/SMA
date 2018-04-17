import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { RequestOptions,Headers } from '@angular/http';
import {Order} from '../../Entities/Order';

/*
  Generated class for the OrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderProvider {

ipAddress = '192.168.1.8';
portNo = '3446';
fullBaseUrl = 'http://' + this.ipAddress + ':' + this.portNo + '/Sportify-war/Resources/Order';
baseUrl = "/api/Order"; 

  constructor(public platform: Platform,public httpClient: HttpClient) {
    console.log('Hello ProductProvider Provider');
  }
  
  //makeOrder(customerId: number, voucherCode: String, totalAmount: number, datePaid: Date, productPurchases: ProductPurchase[]) Observable<any>{
	makeOrder(order: Order): Observable<any>{
	  console.log("Order.makeOrderProvider() called!");
	
	  let path: string = '';
	  if(this.platform.is('core') || this.platform.is('mobileweb'))
	  {
		path = this.baseUrl;
	  }
	  else
	  {
		path = this.fullBaseUrl;
	  }
	   
	   console.log("*********** Order No JSon: " + order);
	   console.log("*********** MY PATH IS " + path);
	   
	   console.log("*********** Order Json: " + JSON.stringify(order));	
	   
	  return this.httpClient.post(path + "/addCustomerOrder", JSON.stringify(order), 
			{
			  headers:
			  {
				'content-type':"application/json",
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
