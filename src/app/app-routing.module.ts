import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { CarComponent } from './car/car.component';
import { AboutComponent } from './about/about.component';
import { DepartmentComponent } from './department/department.component';
import { DetailsComponent } from './details/details.component';

import { CheckoutComponent } from './checkout/checkout.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from 'src/helpers/auth-guard';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { ProductlistComponent } from './productlist/productlist.component';
import {ReceiptComponent} from './receipt/receipt.component';
import {FormsearchComponent} from './formsearch/formsearch.component';
import {OfertasComponent} from './ofertas/ofertas.component';

const routes: Routes = [
  {
    path: '', component: DefaultLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'car', component: CarComponent },
      { path: 'about', component: AboutComponent },
      { path: 'department', component: DepartmentComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'product-detail/:id', component: DetailsComponent },
      { path: 'productlist/:id', component: ProductlistComponent },
      { path: 'Test/:id', component: TestComponent },
      { path: 'receipt/:id', component: ReceiptComponent },
      { path: 'formsearch/:id', component: FormsearchComponent },
      { path: 'ofertas/:id', component: OfertasComponent },
    ]
  },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),BrowserModule,CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
