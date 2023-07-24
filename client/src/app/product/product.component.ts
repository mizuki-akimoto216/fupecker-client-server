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
      this.mainImage = this.productInfo.firstProduct;
      this.firstCarousel = this.productInfo.firstProduct;
      this.secondCarousel = this.productInfo.secondProduct;
      this.thirdCarousel = this.productInfo.thirdProduct;
    });
  }
  
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
