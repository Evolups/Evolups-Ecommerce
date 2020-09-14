import { Component, OnInit, } from '@angular/core';
import { BagService } from 'src/services/bag.service';
import { Router,NavigationEnd } from '@angular/router';
import { FormGroup, FormControl, Validators,NgForm } from '@angular/forms';
import { User } from '../interfaces/interfaces';

import { AuthService } from 'angularx-social-login';
import { AccountService } from 'src/services/account.service';
import { environment } from 'src/environments/environment';
import {ProductService} from 'src/services/product.service';


@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {

 
  accountForm: FormGroup;
  registerUser: User = {
    usuario: ''
  };

  mySubscription: any;
 
  constructor(
    

    public bagService: BagService,
    private router: Router,
    public producservices:ProductService,
    private accountService: AccountService) {
      this.setForm();
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
      this.mySubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Trick the Router into believing it's last link wasn't previously loaded
          this.router.navigated = false;
        }
      });
    

  }

  async register( fRegister: NgForm ) {
   // if (fRegister.invalid) { return; }
    ///const valido = await this.userService.register( this.registerUser);
   this.router.navigate(['/formsearch',this.registerUser.usuario.replace("%20",'')]);
 
   //console.log(fRegister.value);
  }

  
  Foto:string;
  titulo:string;
  titulo2:string;
  titulo3:string;
  usuariolog:any;
  currentUser: any;

  ngOnInit(): void {
 
   if(this.bagService.userLog!=null){

    this.inicio();

   } else {
     this.titulo2="";
     this.titulo="";
     this.titulo="Ingresar |";
     this.titulo2="Registrate |";
   }  

  }
  

inicio(){
     

if(this.titulo=="Ingresar |"   ){
/*   alert(this.titulo);
  alert(this.titulo2);   */

  sessionStorage.removeItem("e-commerce");
 
  this.router.navigate(['/login','logout']);
}

if(this.titulo!="Ingresar |" && this.bagService.userLog!=null){
    this.titulo="";
    this.titulo2="";
    this.titulo3="Salir";
    this.Foto=this.bagService.userLog.PhotoUrl;
    this.titulo=this.bagService.userLog.name +" | ";
}
   
 
  }


   newsletter(obj){
   
    let array = [];
    array.push(obj);
    console.log("email",obj);

    this.producservices.newsletter(array).subscribe(result => {
      alert("Email Registrado Correctamente.");
    });

  }

  
  setForm() {
    this.accountForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
   
    });
  }

   
logout(){

  sessionStorage.clear();
  sessionStorage.removeItem("e-commerce");
  this.titulo2="";
  this.titulo3="";
  this.titulo="";
  this.titulo="Ingresar |";
  this.titulo2="Registrate |";
  this.Foto="";

  this.router.navigateByUrl('/index.html');
  window.location.reload();
}

  departamento(){

    this.router.navigate(['/department']);
  
    }
  
  

}
