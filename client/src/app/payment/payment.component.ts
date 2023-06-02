import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  selectedCountry: string = '';
  address: string = '';
  address2: string = '';
  city: string = '';
  province: string = '';
  postalCode: string = '';
  cardNo: string = '';
  nameOfCard: string = '';
  exprationDate: string = '';
  securityCode: string = '';
}
