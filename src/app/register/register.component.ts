import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  accountForm: FormGroup;
  constructor(private accountService: AccountService) {
    this.setForm();
  }

  ngOnInit(): void {
  }

  save(obj) {
    let array = [];
    array.push(obj);
    this.accountService.register(array).subscribe(result => {
      console.clear();
      if (result == 'ok') {
        alert('Usuario registrado exitosamente.');
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
      email: new FormControl('', [
        Validators.required,
      ]),
      clave: new FormControl('', [
        Validators.required,
      ]),
    });
  }

}
