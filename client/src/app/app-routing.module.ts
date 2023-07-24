import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { PaymentComponent } from './payment/payment.component';
import { CompleteComponent } from './complete/complete.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { AdminProductDetailComponent } from './admin-product-detail/admin-product-detail.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"home", component:HomeComponent},
  {path:"product/:id", component:ProductComponent},
  {path:"cart", component:CartComponent},
  {path:"login", component:LoginComponent},
  {path:"payment", component:PaymentComponent},
  {path:"complete", component:CompleteComponent},
  {path:"signup", component:SignupComponent},
  {path:"admin", component:AdminComponent},
  {path:"adminProductDetail/:id", component: AdminProductDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
