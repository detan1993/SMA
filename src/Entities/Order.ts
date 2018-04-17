import {ProductPurchase} from './ProductPurchase';

export class Order{
	customerId:number;
	voucherId:number;
	
	totalAmount:number;
	datePaid:Date;
	
	productPurchases:ProductPurchase[];
	sizePurchases: String[];
	
	constructor(){
	}
}