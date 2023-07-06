import { Component } from '@angular/core';
import { productInfo } from '../interface/productInfo.interface';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  productInfo:any;
  mainImage: string = '';
  firstCarousel: string = '';
  secondCarousel: string = '';
  thirdCarousel: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    let productID = this.route.snapshot.paramMap.get("id");
    console.log("productID is:", productID);

    this.http.get(environment.server + "/productsInfo/" + productID).subscribe(productData =>{
      this.productInfo = productData;
      // console.log("productData is:", productData);
      // console.log("firstProduct is:", this.productInfo.firstProduct);
      this.mainImage = this.productInfo.firstProduct;
      this.firstCarousel = this.productInfo.firstProduct;
      this.secondCarousel = this.productInfo.secondProduct;
      this.thirdCarousel = this.productInfo.thirdProduct;
    });
  }

  // productInfo:productInfo = 
  //   {
  //     productId: 1,
  //     firstProduct: "../../assets/product1-1.png",
  //     secondProduct: "../../assets/product1-2.png",
  //     thirdProduct: "../../assets/product1-3.png",
  //     productName: "Gradient",
  //     price: 8,
  //     colorName: ["Purple", "Pink", "Orange" ],
  //     stock: 10,
  //     description: "This is sticker with beautiful gradient. Lorem ipsum dolor sit amet, consect etur adipiscing elit. Vivamus nec nisl quis tellus maximus blandit."
  //   }
  
  switchImage(imagePath: string) {
    this.mainImage = imagePath;
    const items = document.querySelectorAll('#carousel .carousel-item');
    items.forEach(item => item.classList.remove('active'));
    if (this.firstCarousel === imagePath) {
      items[0].classList.add('active');
    } else if (this.secondCarousel === imagePath) {
      items[1].classList.add('active');
    } else if (this.thirdCarousel === imagePath) {
      items[2].classList.add('active');
    }
  }

    selectedColor: string = '';
    showErrorMessage: boolean = false;

    
    addToCart() {
      if (this.selectedColor === '') {
        this.showErrorMessage = true;
      } else {
        this.showErrorMessage = false;
        this.router.navigate(['/cart']);
      }
    }

}
