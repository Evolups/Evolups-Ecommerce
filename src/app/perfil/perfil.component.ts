import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from 'src/services/account.service';
import { BagService } from 'src/services/bag.service';
import { from } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  accountForm: FormGroup;
  user:any;
  productid = '';
  cantidad = 1;
  groupMarcas: any[][] = [];
  marcas: any [][]=[];

  constructor(private acccountservices:AccountService,private bagservices:BagService,    private accountService: AccountService,) {
    this.setForm();

   }

  ngOnInit(): void {
   //Uusario que esta logueado
   this.user = localStorage.getItem('e-commerce');

   this.user =JSON.parse( localStorage.getItem('e-commerce'));
 

  this.GetPerfil();
  }


  GetPerfil(){


 
 this.accountService.getByUserName(this.user.email).subscribe(result => {
 
 
this.accountForm.controls['nombre'].setValue(result[0].name);
this.accountForm.controls['apellido'].setValue(result[0].apellido);
this.accountForm.controls['direccion'].setValue(result[0].direccion_vive);
this.accountForm.controls['email'].setValue(result[0].email);
this.accountForm.controls['celular'].setValue(result[0].celular);
this.accountForm.controls['telefono'].setValue(result[0].telefono);
this.accountForm.controls['clave'].setValue(result[0].clave);

    });
  
  }  

  
  save(obj) {  
    let array = [];
    array.push(obj);
    console.log('Usuario a grabar',array);


    this.accountService.register(array).subscribe(result => {
      //console.clear();
     // alert(result);

      if (result == 'ok') {
        alert('Usuario Actualizado Correctamente.');
      

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
         Validators.required,
      ]),
      telefono: new FormControl('', [
        Validators.required,
     ]),
    
      clave: new FormControl('', [
        Validators.required,
      ]),
    });
  }


}
