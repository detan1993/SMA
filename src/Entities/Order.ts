import {ProductPurchase} from './ProductPurchase';

export class Order{
	customerId:number;
	voucherCode:String;
	
	totalAmount:number;
	datePaid:Date;
	
	productPurchases:ProductPurchase[];
	
	constructor(){
	}
}