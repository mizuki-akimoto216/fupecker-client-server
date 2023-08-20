import { Component } from '@angular/core';
import { Product } from '../interface/productList.interface';
import { Products } from '../interface/productList.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
    this.http.get<Products>(environment.server + "/products").subscribe(responce => {
      console.log(responce.products);
      this.productList = responce.products;
    });
  }

  checkStock(stock:number){
      if (stock==0) {
        return true;
    } else {
        return false;
    }
  }
}
