import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, UrlSerializer } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AccountService } from 'src/services/account.service';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { BagService } from 'src/services/bag.service';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  returnUrl: string;
  model = {
    usuario: '',
    clave: ''
  };
  public user: any;
  loggedIn = false;
  mySubscription: any;


  constructor(
    private productservices: ProductService,
    public bagservices: BagService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private authService: AuthService) {

    /*    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/home';
      */
    if (sessionStorage.getItem(environment.keyLoginsessionStorage)) {

      if (this.activatedRoute.snapshot.paramMap.get('id') == "Logout") {

        this.signOut();

      } else {
        router.navigateByUrl(this.returnUrl);

      }



    }

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

  ngOnInit(): void {

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);

      this.setData(user);


    }


    );


  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);

  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    sessionStorage.clear();
    /*     this.router.navigateByUrl("/login/Iniciar");
        this.router.navigateByUrl("/home"); */
    this.refrescar();
    this.bagservices.user = null;
    this.bagservices.userlog.next(null);
    this.authService.signOut();
  }

  login() {

    this.getByUserName();


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
    // document.location.href = (`https://evolups.com/index.html`);
    document.location.href =(`http://localhost:4200/` );
    
    /*  
    this.bagservices.user=result.usuario;
    sessionStorage.setItem(environment.keyLoginsessionStorage, JSON.stringify(result));
     this.bagservices.userlog.next(JSON.parse(sessionStorage.getItem(environment.keyLoginsessionStorage)));  
     //document.location.href =(`https://evolups.com/index.html` ); */
    // document.location.href =(`http://localhost:4200/index.html` );
    //this.getsessionStorage();




  }

  getsessionStorage() {

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.setData(user);



    }


    );




  }

  getByUserName() {
    this.accountService.getByUserName(this.model.usuario).subscribe(result => {
      if (result.length > 0) {
        if (result[0].clave == this.model.clave) {

          this.setData(result[0]);

          /*this.getsessionStorage();    */
          this.refrescar();


        } else {
          alert('usuario o contraseña incorrecta');
        }
      }
    });
  }
}

