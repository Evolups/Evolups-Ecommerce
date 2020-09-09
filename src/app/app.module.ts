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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CheckoutComponent } from './checkout/checkout.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from 'src/helpers/jwt-interceptor';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";


const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('69519889741-6s564vs4m9dupm8p31p7d6nv9js4urk0.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('1452955061565768')
  }
]);

export function provideConfig() {
  return config;
}
import { TestComponent } from './test/test.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { FormsearchComponent } from './formsearch/formsearch.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { HistoryComponent } from './history/history.component';

import { PerfilComponent } from './perfil/perfil.component';
import { HistorydetailComponent } from './historydetail/historydetail.component';
import { GooglePlacesComponent } from './google-places/google-places.component';
import { PagoErrorComponent } from './pago-error/pago-error.component';
import { CarsComponent } from './cars/cars.component';
import { DetailsProductComponent } from './details-product/details-product.component';
import { ConfirmaremailComponent } from './confirmaremail/confirmaremail.component';
import { ComercioComponent } from './comercio/comercio.component';


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
    RegisterComponent,
    LoginComponent,
    TestComponent,
    ProductlistComponent,
    ReceiptComponent,
    FormsearchComponent,
    OfertasComponent,
    HistoryComponent,
    PerfilComponent,
    HistorydetailComponent,
    GooglePlacesComponent,
    PagoErrorComponent,
    CarsComponent,
    DetailsProductComponent,
    ConfirmaremailComponent,
    ComercioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: AuthServiceConfig, useFactory: provideConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
