import { Component, OnInit,Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from 'src/services/account.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { environment } from 'src/environments/environment';
import { BagService } from 'src/services/bag.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  accountForm: FormGroup;
  constructor(
    private accountService: AccountService,
    private router:Router,
    private productservice:ProductService,
    public bagservices: BagService,
    private productservices: ProductService,
    private authService: AuthService) {
    this.setForm();
  }

  @Input() email: string;
  public user: any;
  loggedIn = false;
  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);

      this.setData(user);

    });
  }

  setData(result) {


    if (!result) {
      return;
    }

    let myArray = [];

    const usernew = {
      apellido: "",
      usuario: result.email,
      clave: "",
      email: result.email,
      nombre: result.name,
      categoria: "usuario",
      cargo: "cliente",
      telefono: "",
      celular: "",
      direccion: "",
    };

    myArray.push(usernew);

    console.log(myArray);


    this.accountService.register(myArray).subscribe(resultado => {
      console.clear();
      if (resultado == 'ok') {
        alert('Usuario registrado exitosamente.');
        //ENVIO CORREO DE BIENVENIDA        
        this.productservices.enviar_email("BIENVENIDO", "BIENVENIDO", result.email, "BienvenidaEvolups.html", result.name).subscribe(result => {

        });

        this.router.navigate(['/login', "logout"]);

      } else {
        alert('Ha ocurrido un problema');
      }
    });


    //envio a grabar el usuario


    this.bagservices.user = result.usuario;
    sessionStorage.setItem(environment.keyLoginsessionStorage, JSON.stringify(result));
    this.bagservices.userlog.next(JSON.parse(sessionStorage.getItem(environment.keyLoginsessionStorage)));

    this.refrescar();


  }

  
  refrescar() {
    //para actualizar el usuario
    document.location.href = (`https://evolups.com/`);
    // document.location.href =(`http://localhost:4200/` );

  }

  save(obj) { 

    let array = [];
    array.push(obj);
    console.log('usuario registrado',obj);
    
    this.accountService.register(array).subscribe(resultado => {
      //console.clear();
      if (resultado == 'ok') {
        alert('Usuario registrado exitosamente.');
        //ENVIO CORREO DE BIENVENIDA
        
        this.productservice.enviar_email("BIENVENIDO","BIENVENIDO",obj.email,"BienvenidaEvolups.html",obj.nombre).subscribe(result => {
     
        });

        this.router.navigate(['/login',"logout"]);

      } else {
        alert('Ha ocurrido un problema');
      }
    });
    
  }

  setForm() {
    this.accountForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      direccion: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(40),
      ]),

      
      email: new FormControl('', [
        Validators.required,
      ]),
  
    
      celular: new FormControl('', [
        // Validators.required,
      ]),
    
      clave: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);

  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }


}
