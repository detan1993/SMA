import {ProductSize} from '../../Entities/ProductSize';
import {Images} from '../../Entities/Images';

export class Product{
  id:number;
  productCode: String;
  productName: String;
  description: String;
  price:number;
  team:String;
  gender:String;
  country:String;
  dateCreated:String;
  status:String;

  imageList :Images[];
  sizeList: ProductSize[];


  constructor(){

  }
}
