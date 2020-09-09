import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { CarComponent } from './car/car.component';
import { CarsComponent } from './cars/cars.component';
import { AboutComponent } from './about/about.component';
import { DepartmentComponent } from './department/department.component';
import { DetailsComponent } from './details/details.component';
import { DetailsProductComponent } from './details-product/details-product.component';
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
import {PagoErrorComponent} from './pago-error/pago-error.component';
import {FormsearchComponent} from './formsearch/formsearch.component';
import {OfertasComponent} from './ofertas/ofertas.component';
import {HistoryComponent} from './history/history.component';
import {HistorydetailComponent} from './historydetail/historydetail.component';
import {PerfilComponent} from './perfil/perfil.component';
import {GooglePlacesComponent} from './google-places/google-places.component'
import {ConfirmaremailComponent} from './confirmaremail/confirmaremail.component'

import { AgmCoreModule } from '@agm/core';
import { ComercioComponent } from './comercio/comercio.component';

const routes: Routes = [
  {
    path: '', component: DefaultLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'car', component: CarComponent },
      { path: 'cars', component: CarsComponent },
      { path: 'about', component: AboutComponent },
      { path: 'department', component: DepartmentComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login/:id', component: LoginComponent },
      { path: 'product-detail/:id', component: DetailsComponent },
      { path: 'detailsproduct/:id', component: DetailsProductComponent },
      
      { path: 'productlist/:id/:AuthGuardcant', component: ProductlistComponent },
      { path: 'Test', component: TestComponent },
      { path: 'receipt/:id', component: ReceiptComponent },
      { path: 'formsearch/:id', component: FormsearchComponent },
      { path: 'ofertas/:id', component: OfertasComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'historydetail/:id', component: HistorydetailComponent },
      { path: 'googlesplaces', component: GooglePlacesComponent },
      { path: 'pagoerror/:id', component: PagoErrorComponent },
      { path: 'confirmaremail/:id', component: ConfirmaremailComponent },
      { path: 'comercio/:id/:cant', component: ComercioComponent },
      
    ]
  },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),BrowserModule,CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'places&key=AIzaSyCdDdQgQZj5LvrWWBdHvAJ6ffNykJt42iM',
      libraries: ['places']
    })
  
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
