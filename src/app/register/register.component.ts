import { Component, OnInit,Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from 'src/services/account.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  accountForm: FormGroup;
  constructor(private accountService: AccountService,private router:Router,private productservice:ProductService) {
    this.setForm();
  }

  @Input() email: string;
  
  ngOnInit(): void {
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

}
