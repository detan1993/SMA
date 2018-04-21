import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import {Product} from '../../Entities/Product';
import { Platform } from 'ionic-angular';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/*
  Generated class for the ProductProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductProvider {

/*ipAddress = '192.168.1.8';
portNo = '3446'; 
fullBaseUrl = 'http://' + this.ipAddress + ':' + this.portNo + '/Sportify-war/Resources/Product'; */
baseUrl = "/api/Product";  // the system will replace the api with the proxy URL that we speicfy in ionic.config.json

fullBaseUrl = 'http://is3106-gp02.southeastasia.cloudapp.azure.com:8080/Sportify-war/Resources/Product';

  constructor(public platform: Platform,public httpClient: HttpClient) {
    console.log('Hello ProductProvider Provider');
  }

  getAllActiveProducts(): Observable<any>{
	console.log("Product.getAllActiveProducts() called!");
	
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
	  return this.httpClient.get<any>(path + "/getAllActiveProducts").pipe
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
