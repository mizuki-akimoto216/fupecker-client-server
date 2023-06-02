import { Component } from '@angular/core';
import { cart } from '../interface/cart.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartList:cart = 
    {
      productId: 1,
      productImg: "../../assets/product1-1.png",
      productName: "Gradient",
      color: "Purple",
      price: 8,
      amount: 10
    }

  generateArray(amount: number): number[] {
    return Array(amount).fill(0).map((_, i) => i + 1);
  }

  selectedItemCount = 1;

  selectedFileName: string = '';
  
  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFileName = target.files[0].name;
    } else {
      this.selectedFileName = "";
    }
  }
}
