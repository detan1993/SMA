import {ProductSize} from './ProductSize';
import {Images} from './Images';

export class Product{
  id:number;
  productCode: String;
  productName: String;
  description: String;
  price:number;
  team:String;
  gender:String;
  country:String;
  dateCreated:Date;
  status:String;

  images :Images[];
  sizes: ProductSize[];


  constructor(){

  }
}
