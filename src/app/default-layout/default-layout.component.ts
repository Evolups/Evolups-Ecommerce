import { Component, OnInit } from '@angular/core';
import { BagService } from 'src/services/bag.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../interfaces/interfaces';
import { AuthService } from 'angularx-social-login';
import { AccountService } from 'src/services/account.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {


  registerUser: User = {
    usuario: ''
  };
  currentUser: any;


  constructor(
    public bagService: BagService,
    private router: Router,
    private accountService: AccountService) {
    this.currentUser = environment.currentUser;
  }

  async register(fRegister: NgForm) {
    // if (fRegister.invalid) { return; }
    // const valido = await this.userService.register( this.registerUser);
    this.router.navigate(['/formsearch', this.registerUser.usuario]);

    console.log(fRegister.value);
  }


  ngOnInit(): void {
  }



  departamento() {

    this.router.navigate(['/department']);

  }

  salir() {
    this.accountService.logOut();
  }



}
