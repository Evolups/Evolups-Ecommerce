import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { CarComponent } from './car/car.component';
import { AboutComponent } from './about/about.component';
import { DepartmentComponent } from './department/department.component';
import { DetailsComponent } from './details/details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutComponent } from './checkout/checkout.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { TestComponent } from './test/test.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { FormsearchComponent } from './formsearch/formsearch.component';
import { OfertasComponent } from './ofertas/ofertas.component';



@NgModule({
  declarations: [
    HomeComponent,
    ContactComponent,
    CarComponent,
    AboutComponent,
    DepartmentComponent,
    DetailsComponent,
    AppComponent,
    CheckoutComponent,
    DefaultLayoutComponent,
    TestComponent,
    ProductlistComponent,
    ReceiptComponent,
    FormsearchComponent,
    OfertasComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
