import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AccountService } from 'src/services/account.service';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

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
  user: any;
  loggedIn = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private authService: AuthService) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/home';

    if (localStorage.getItem(environment.keyLoginLocalStorage)) {
      router.navigateByUrl(this.returnUrl);
    }
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
      console.log(this.loggedIn);
      this.setData(user);
    });

    this.accountService.getUsers().subscribe(res => {
      console.log(res);
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  login() {
    this.getByUserName();
    // this.accountService.login(this.model).subscribe(result => {
    //   if (result == 'ok') {
    //     this.setData(result);
    //   } else {
    //     alert('Error'); // this.pnotify.error(result.Messages.Message);
    //   }

    // });
  }

  setData(result) {
    if (!result) {
      return;
    }
    localStorage.setItem(environment.keyLoginLocalStorage, JSON.stringify(result));
    this.router.navigateByUrl(this.returnUrl);
  }

  getByUserName() {
    this.accountService.getByUserName(this.model.usuario).subscribe(result => {
      if (result.length > 0) {
        if (result[0].clave == this.model.clave) {
          alert('si');
          this.setData(result[0]);
        } else {
          alert('usuario o contraseña incorrecta');
        }
      }
    });
  }
}

