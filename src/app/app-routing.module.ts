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


const routes: Routes = [
  {
    path: '', component: DefaultLayoutComponent,
    children: [
      { path: '*', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'car', component: CarComponent },
      { path: 'about', component: AboutComponent },
      { path: 'department', component: DepartmentComponent },
      { path: 'product-detail/:id', component: DetailsComponent }

    ]
  },
  { path: 'checkout', component: CheckoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
