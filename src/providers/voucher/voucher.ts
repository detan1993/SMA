import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';


/*
  Generated class for the VoucherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VoucherProvider {

ipAddress = '192.168.1.8';
portNo = '3446';
fullBaseUrl = 'http://' + this.ipAddress + ':' + this.portNo + '/Sportify-war/Resources/Voucher';
baseUrl = "/api/Voucher"; 

  constructor(public platform: Platform,public httpClient: HttpClient) {
    console.log('Hello ProductProvider Provider');
  }

  getAllVouchers(customerId: number): Observable<any>{
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
	  return this.httpClient.get<any>(path + "/getAllCustomerVoucher/" + customerId).pipe
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
