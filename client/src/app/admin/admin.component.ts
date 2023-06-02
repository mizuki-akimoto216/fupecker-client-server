import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{

  products:any;
  name:string = '';
  price:number = 0;
  stock:number = 0;
  description:string = '';
  online:boolean = false;
  productID:number = 0;
  message:any = '';

  constructor(private http:HttpClient){}

  //Get all products
  ngOnInit():void{
    this.message = localStorage.getItem('message');
    localStorage.removeItem('message');

    this.http.get("http://localhost:4400/adminProducts").subscribe(res => {
      this.products = res;
    })
  }

  //Add new products
  addNew(){
      this.http.post("http://localhost:4400/adminProducts", {name:this.name, price:this.price, stock:this.stock, description:this.description, online:this.online}).subscribe(res => {
      if(res){
        localStorage.setItem('message', 'Added product successfully');
      } else {
        localStorage.setItem('message', 'Failed to add product. Please try again');        
      }
      location.reload(); 
    })
  }

  //Update products
  updateProduct(product:any){
    const confirmation = confirm('Are you sure you want to update this product?');
    if (confirmation) {
      this.updateConfirmed(product);
    }
  }

  updateConfirmed(product: any) {
    this.productID = product.productID;
    this.http.put("http://localhost:4400/adminProducts/" + this.productID, {name:product.name, price:product.price, stock:product.stock, description:product.description, online:product.online}).subscribe(res => {
      if(res){
        localStorage.setItem('message', 'Updated product successfully');
      } else {
        localStorage.setItem('message', 'Failed to update product. Please try again');      
      }
      location.reload(); 
    })
  }

  //Delete products
  deleteProduct(product:any){
    const confirmation = confirm('Are you sure you want to delete this product?');
    if (confirmation) {
      this.deleteConfirmed(product);
    }
  }

  deleteConfirmed(product: any) {
    this.productID = product.productID;
    this.http.delete("http://localhost:4400/adminProducts/" + this.productID).subscribe(res => {
      if (res) {
        localStorage.setItem('message', 'Deleted product successfully');
      } else {
        localStorage.setItem('message', 'Failed to delete product. Please try again');
      }
      location.reload(); 
    });
  }
  
  setLiveStatus(productID:number, status:boolean){
    this.http.put("http://localhost:4400/productOnline/" + productID, {online:status}).subscribe(res => {
      if(res){
        console.log('Success');
      } else {
        console.log('Fail');     
      }
    })
  }
}
