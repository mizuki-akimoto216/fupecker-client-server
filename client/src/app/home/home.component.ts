import { Component } from '@angular/core';
import { Product } from '../interface/productList.interface';
import { Products } from '../interface/productList.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  productList:any[] = [];
  hiddenProductList:any;

  constructor(private http:HttpClient) {

  }

  ngOnInit():void {
    this.http.get<Products>("http://localhost:4400/products").subscribe(responce => {
      console.log(responce.products);
      this.productList = responce.products;
      this.hiddenProductList = this.productList.filter(product => product.online === 0);
    });
  }

  isHiddenProduct(product: Product): boolean {
    return this.hiddenProductList.includes(product);
  }

  parseColorData(colorData : string): string[] {
    return JSON.parse(colorData);
  }

  // productList:Product[] = [
  //   { 
  //     productId: 1,
  //     firstProduct: "../../assets/product1-1.png",
  //     secondProduct: "../../assets/product1-2.png",
  //     thirdProduct: "../../assets/product1-3.png",
  //     productName: "Gradient",
  //     color: ["#CA7BCC", "#DD5E89", "#F7971E" ],
  //     price: 8,
  //     stock: 10,
  //     description: "This is sticker with beautiful gradient. Lorem ipsum dolor sit amet, consect etur adipiscing elit. Vivamus nec nisl quis tellus maximus blandit."
  //   },
  //   {
  //     productId: 2,
  //     firstProduct: "../../assets/product2-1.png",
  //     secondProduct: "../../assets/product2-2.png",
  //     thirdProduct: "../../assets/product2-3.png",
  //     productName: "Speech Bubble",
  //     color: ["#E73245", "#4169E2", "#F4C530" ],
  //     price: 20,
  //     stock: 0,
  //     description: "This is sticker with Speech Bubble. Lorem ipsum dolor sit amet, consect etur adipiscing elit. Vivamus nec nisl quis tellus maximus blandit."
  //   },
  //   {
  //     productId: 3,
  //     firstProduct: "../../assets/product3-1.png",
  //     secondProduct: "../../assets/product3-2.png",
  //     thirdProduct: "../../assets/product3-3.png",
  //     productName: "Stylish",
  //     color: ["#4A6049", "#641F2C", "#573A20" ],
  //     price: 10,
  //     stock: 30,
  //     description: "This is stylish sticker.  Lorem ipsum dolor sit amet, consect etur adipiscing elit. Vivamus nec nisl quis tellus maximus blandit."
  //   }
  // ]

  checkStock(stock:number){
      if (stock==0) {
        return true;
    } else {
        return false;
    }
  }
}
