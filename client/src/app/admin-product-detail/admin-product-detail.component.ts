import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-product-detail',
  templateUrl: './admin-product-detail.component.html',
  styleUrls: ['./admin-product-detail.component.scss']
})
export class AdminProductDetailComponent implements OnInit{

  productDetails:any;
  image:string = '';
  colorCode:string = '';
  colorName:string = '';
  message:any = '';
  productDetailID:number = 0;

  constructor(private route:ActivatedRoute, private http: HttpClient){}

  ngOnInit():void {
    this.message = localStorage.getItem('message');
    localStorage.removeItem('message');
    
    let productID = this.route.snapshot.paramMap.get("id");
    console.log(productID);

    this.http.get("http://localhost:4400/adminProductDetails/" + productID).subscribe(res => {
      this.productDetails = res;
      console.log(this.productDetails);
    })
  }

  //Add new product detail
  addNewPD(){
    let productID = this.route.snapshot.paramMap.get("id");
    console.log(productID, this.image,this.colorCode, this.colorName);
    this.http.post("http://localhost:4400/adminProductDetails", {id:productID, image:this.image, colorCode:this.colorCode, colorName:this.colorName}).subscribe(res => {
    if(res){
      localStorage.setItem('message', "Added product detail successfully");
    } else {
      localStorage.setItem('message', "Failed to add product detail. Please try again");     
    }
    location.reload();
  })
 }

  //Update products
  updateProductDetail(productDetail:any){
    const confirmation = confirm('Are you sure you want to update this product?');
    if (confirmation) {
      this.updateConfirmed(productDetail);
    }
  }

  updateConfirmed(productDetail: any) {
      console.log(productDetail.productDetailID, productDetail.image, productDetail.colorCode, productDetail.colorName);
    this.http.put("http://localhost:4400/adminProductDetails/" + productDetail.productDetailID, {image:productDetail.image, colorCode:productDetail.colorCode, colorName:productDetail.colorName}).subscribe(res => {
      if(res){
        localStorage.setItem('message', "Updated product detail successfully");
      } else {
        localStorage.setItem('message', "Failed to update product detail. Please try again");        
      }
      location.reload(); 
    })
  }

  //Delete products
  deleteProductDetail(productDetail:any){
    const confirmation = confirm('Are you sure you want to delete this product?');
    if (confirmation) {
      this.deleteConfirmed(productDetail);
    }
  }

  deleteConfirmed(productDetail:any){
    this.http.delete("http://localhost:4400/adminProductDetails/" + productDetail.productDetailID).subscribe(res => {
      if(res){
        localStorage.setItem('message', "Deleted product detail successfully");
      } else {
        localStorage.setItem('message', "Failed to delete product detail. Please try again");        
      }
      location.reload(); 
    })
  }
}
